/**
 * Cardano wallet detection and interaction utilities
 * Based on CIP-30 standard for browser wallet integration
 */

export interface WalletInfo {
    id: string;
    name: string;
    icon: string;
    apiVersion: string;
}

/**
 * Detect available Cardano wallets in the browser
 * @returns Array of detected wallet information
 */
export async function detectWallets(): Promise<WalletInfo[]> {
    if (typeof window === 'undefined') return [];
    
    const wallets: WalletInfo[] = [];
    
    // Wait a bit for wallets to inject themselves
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const cardano = (window as any).cardano;
    if (!cardano) return wallets;
    
    // Scan for wallets in window.cardano namespace
    for (const [key, value] of Object.entries(cardano)) {
        if (value && typeof value === 'object' && 'name' in value && 'apiVersion' in value && 'icon' in value) {
            const wallet = value as any;
            wallets.push({
                id: key,
                name: wallet.name,
                icon: wallet.icon,
                apiVersion: wallet.apiVersion
            });
        }
    }
    
    return wallets;
}

/**
 * Get a specific wallet by ID
 * @param walletId - The wallet identifier (e.g., 'nami', 'eternl', 'flint')
 * @returns The wallet object or null if not found
 */
export function getWallet(walletId: string): any {
    if (typeof window === 'undefined') return null;
    
    const cardano = (window as any).cardano;
    return cardano?.[walletId] || null;
}

/**
 * Check if a specific wallet is installed
 * @param walletId - The wallet identifier
 * @returns true if the wallet is installed
 */
export function isWalletInstalled(walletId: string): boolean {
    return getWallet(walletId) !== null;
}