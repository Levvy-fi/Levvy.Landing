import { Blockfrost, Core, Blaze, WebWallet } from '@blaze-cardano/sdk';
import type { CardanoWalletApi as CIP30Wallet } from '../scripts/types';

/**
 * BlazeWalletService - Service for querying Cardano blockchain data using Blaze SDK
 * This service provides cold wallet functionality (no wallet connection required)
 * for querying balances and other blockchain data.
 */
export class BlazeWalletService {
    private providers: Map<string, Blockfrost> = new Map();
    
    private initProvider(projectId: string, network: string = 'mainnet') {
        const cacheKey = `${projectId}-${network}`;
        
        if (this.providers.has(cacheKey)) {
            return this.providers.get(cacheKey)!;
        }
        
        if (!projectId) {
            throw new Error('BLOCKFROST_PROJECT_ID is required');
        }
        
        const provider = new Blockfrost({
            network: network as any,
            projectId: projectId
        });
        
        this.providers.set(cacheKey, provider);
        return provider;
    }

    /**
     * Query the ADA balance of a wallet address
     * @param address - Cardano wallet address (bech32 format)
     * @param projectId - Blockfrost project ID
     * @param network - Network to query (default: 'mainnet')
     * @returns Promise<number> - ADA balance in lovelace (1 ADA = 1,000,000 lovelace)
     */
    async getAddressBalance(address: string, projectId: string, network: string = 'mainnet'): Promise<number> {
        try {
            const provider = this.initProvider(projectId, network);
            
            // Convert address string to Blaze Address object
            const cardanoAddress = Core.Address.fromBech32(address);
            
            // Query UTxOs for the address
            const utxos = await provider.getUnspentOutputs(cardanoAddress);
            
            // Calculate total ADA balance from all UTxOs
            let totalLovelace = 0n;
            
            for (const utxo of utxos) {
                const adaAmount = utxo.output().amount().coin();
                totalLovelace += adaAmount;
            }
            
            // Convert from BigInt lovelace to number (safe for ADA amounts up to ~9 million ADA)
            return Number(totalLovelace);
            
        } catch (error) {
            console.error('Error querying address balance:', error);
            throw new Error(`Failed to query balance for address: ${address}`);
        }
    }

    /**
     * Convert lovelace to ADA with specified decimal places
     * @param lovelace - Amount in lovelace
     * @param decimals - Number of decimal places (default: 6)
     * @returns number - Amount in ADA
     */
    lovelaceToAda(lovelace: number, decimals: number = 6): number {
        const ada = lovelace / 1_000_000;
        return Number(ada.toFixed(decimals));
    }

    /**
     * Format ADA amount with K/M suffixes for display
     * @param ada - Amount in ADA
     * @returns string - Formatted amount (e.g., "₳1.2M", "₳500K")
     */
    formatADA(ada: number): string {
        if (ada >= 1_000_000) {
            return `₳${(ada / 1_000_000).toFixed(2)}M`;
        } else if (ada >= 1_000) {
            return `₳${(ada / 1_000).toFixed(2)}K`;
        } else {
            return `₳${ada.toFixed(2)}`;
        }
    }

    /**
     * Get formatted ADA balance for display
     * @param address - Cardano wallet address
     * @param projectId - Blockfrost project ID
     * @param network - Network to query (default: 'mainnet')
     * @returns Promise<{ ada: number, formatted: string, lovelace: number }>
     */
    async getFormattedBalance(address: string, projectId: string, network: string = 'mainnet'): Promise<{
        ada: number;
        formatted: string;
        lovelace: number;
    }> {
        const lovelace = await this.getAddressBalance(address, projectId, network);
        const ada = this.lovelaceToAda(lovelace);
        const formatted = this.formatADA(ada);
        
        return {
            ada,
            formatted,
            lovelace
        };
    }

    /**
     * Build a transaction to send ADA to a payment address
     * @param recipientAddress - Recipient's wallet address (bech32 format)
     * @param amountAda - Amount to send in ADA
     * @param walletApi - CIP30 wallet API for signing
     * @param projectId - Blockfrost project ID
     * @param network - Network to use (default: 'mainnet')
     * @returns Promise<string> - Transaction hash
     */
    async buildAndSubmitPaymentTransaction(
        recipientAddress: string,
        amountAda: number,
        walletApi: CIP30Wallet,
        projectId: string,
        network: string = 'mainnet'
    ): Promise<string> {
        try {
            const provider = this.initProvider(projectId, network);
            
            // Convert ADA to lovelace (1 ADA = 1,000,000 lovelace)
            const lovelaceAmount = BigInt(Math.floor(amountAda * 1_000_000));
            
            // Create a CIP30-compatible wrapper for our wallet API
            const cip30Wallet = {
                ...walletApi,
                getCollateral: walletApi.experimental?.getCollateral || (() => Promise.resolve([]))
            };
            
            // Create a WebWallet wrapper for the CIP30 wallet
            const webWallet = new WebWallet(cip30Wallet as any);
            
            // Initialize Blaze with provider and wallet
            const blaze = await Blaze.from(provider, webWallet);
            
            // Convert recipient address to Core.Address
            const recipientAddr = Core.Address.fromBech32(recipientAddress);
            
            // Build the transaction
            const tx = await blaze
                .newTransaction()
                .payLovelace(recipientAddr, lovelaceAmount)
                .complete();
            
            // Sign the transaction
            const signedTx = await blaze.signTransaction(tx);
            
            // Submit the transaction
            const txHash = await blaze.submitTransaction(signedTx);
            
            return txHash;
            
        } catch (error) {
            console.error('Error building/submitting transaction:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const blazeWalletService = new BlazeWalletService();