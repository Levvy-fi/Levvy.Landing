import { Blockfrost, Core } from '@blaze-cardano/sdk';

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
            return `₳${(ada / 1_000).toFixed(0)}K`;
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
}

// Export singleton instance
export const blazeWalletService = new BlazeWalletService();