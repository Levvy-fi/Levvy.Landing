import { Blockfrost, Core } from '@blaze-cardano/sdk';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * BlazeWalletService - Service for querying Cardano blockchain data using Blaze SDK
 * This service provides cold wallet functionality (no wallet connection required)
 * for querying balances and other blockchain data.
 */
export class BlazeWalletService {
    private provider: Blockfrost | null = null;
    
    private initProvider() {
        if (this.provider) return this.provider;
        
        // Get environment variables from Docusaurus context (browser-safe)
        const projectId = (globalThis as any)?.docusaurus?.siteConfig?.customFields?.blockfrostProjectId || 'mainnetSqCKIyLfSnKrPQEj9hjebU6rJlXNazI0';
        const network = (globalThis as any)?.docusaurus?.siteConfig?.customFields?.blockfrostNetwork || 'mainnet';
        
        this.provider = new Blockfrost({
            network: network as any,
            projectId: projectId
        });
        
        return this.provider;
    }

    /**
     * Query the ADA balance of a wallet address
     * @param address - Cardano wallet address (bech32 format)
     * @returns Promise<number> - ADA balance in lovelace (1 ADA = 1,000,000 lovelace)
     */
    async getAddressBalance(address: string): Promise<number> {
        try {
            const provider = this.initProvider();
            
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
     * @returns Promise<{ ada: number, formatted: string, lovelace: number }>
     */
    async getFormattedBalance(address: string): Promise<{
        ada: number;
        formatted: string;
        lovelace: number;
    }> {
        const lovelace = await this.getAddressBalance(address);
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