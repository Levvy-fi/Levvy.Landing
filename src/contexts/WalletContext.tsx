import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { detectWallets, type WalletInfo } from '../utils/bifrost';
import type { CardanoWalletApi as CIP30Wallet } from '../scripts/types';
import { Core } from '@blaze-cardano/sdk';
import { blazeWalletService } from '../services/BlazeWalletService';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface WalletBalance {
    ada: number;
    formatted: string;
}

export interface ConnectedWallet {
    id: string;
    name: string;
    icon: string;
    api: CIP30Wallet;
    address?: string;
    balance?: WalletBalance;
}

export interface WalletContextState {
    availableWallets: WalletInfo[];
    connectedWallet: ConnectedWallet | null;
    isConnecting: boolean;
    error: string | null;
    connectWallet: (walletId: string) => Promise<void>;
    disconnectWallet: () => void;
    refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextState | undefined>(undefined);

interface WalletProviderProps {
    children: ReactNode;
}

const WALLET_STORAGE_KEY = 'levvy_connected_wallet';

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
    const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { siteConfig } = useDocusaurusContext();
    const projectId = siteConfig?.customFields?.blockfrostProjectId as string;
    const network = (siteConfig?.customFields?.blockfrostNetwork as string) || 'mainnet';

    // Detect available wallets on mount
    useEffect(() => {
        const scanWallets = async () => {
            try {
                const wallets = await detectWallets();
                setAvailableWallets(wallets);
            } catch (err) {
                console.error('Error detecting wallets:', err);
            }
        };

        scanWallets();
        
        // Re-scan when window focus returns (user might have installed a wallet)
        const handleFocus = () => scanWallets();
        window.addEventListener('focus', handleFocus);
        
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    // Auto-reconnect from localStorage
    useEffect(() => {
        const reconnectWallet = async () => {
            const savedWalletId = localStorage.getItem(WALLET_STORAGE_KEY);
            if (savedWalletId && availableWallets.length > 0) {
                const wallet = availableWallets.find(w => w.id === savedWalletId);
                if (wallet) {
                    try {
                        await connectWallet(savedWalletId);
                    } catch (err) {
                        // If auto-reconnect fails, clear the saved wallet
                        localStorage.removeItem(WALLET_STORAGE_KEY);
                    }
                }
            }
        };

        reconnectWallet();
    }, [availableWallets]);

    // Format ADA from lovelace
    const formatADA = (lovelace: number): string => {
        const ada = lovelace / 1_000_000;
        if (ada >= 1_000_000) {
            return `₳${(ada / 1_000_000).toFixed(2)}M`;
        } else if (ada >= 1_000) {
            return `₳${(ada / 1_000).toFixed(1)}K`;
        } else {
            return `₳${ada.toFixed(2)}`;
        }
    };

    // Get wallet balance using Blaze cold wallet service
    const getWalletBalance = async (address: string): Promise<WalletBalance> => {
        try {
            if (!projectId) {
                throw new Error('Blockfrost project ID not configured');
            }
            
            // Query balance using the same service as the sale progress
            const balance = await blazeWalletService.getFormattedBalance(address, projectId, network);
            
            return {
                ada: balance.ada,
                formatted: balance.formatted
            };
        } catch (err) {
            console.error('Error getting wallet balance:', err);
            return { ada: 0, formatted: '₳0' };
        }
    };

    // Get wallet address and convert from hex to bech32
    const getWalletAddress = async (api: CIP30Wallet): Promise<string> => {
        try {
            // Get used addresses first (standard CIP30 - index 0)
            const addresses = await api.getUsedAddresses();
            if (addresses && addresses.length > 0) {
                // Convert hex address to bech32 using Blaze Core
                const addressHex = addresses[0];
                const address = Core.Address.fromBytes(Core.HexBlob(addressHex));
                return address.toBech32();
            }
            
            // Fallback: If no used addresses, try change address
            const changeAddress = await api.getChangeAddress();
            if (changeAddress) {
                const address = Core.Address.fromBytes(Core.HexBlob(changeAddress));
                return address.toBech32();
            }
            
            throw new Error('No addresses found');
        } catch (err) {
            console.error('Error getting wallet address:', err);
            throw err;
        }
    };

    // Connect wallet
    const connectWallet = useCallback(async (walletId: string) => {
        setIsConnecting(true);
        setError(null);
        
        try {
            const walletInfo = availableWallets.find(w => w.id === walletId);
            if (!walletInfo) {
                throw new Error('Wallet not found');
            }

            // Get the wallet API from window.cardano
            const cardanoWallet = (window as any).cardano?.[walletId];
            if (!cardanoWallet) {
                throw new Error('Wallet API not available');
            }

            // Request access
            const api = await cardanoWallet.enable();
            if (!api) {
                throw new Error('Wallet access denied');
            }

            // Get wallet address first
            const address = await getWalletAddress(api);
            
            // Then get balance using the address
            const balance = await getWalletBalance(address);

            const connected: ConnectedWallet = {
                id: walletId,
                name: walletInfo.name,
                icon: walletInfo.icon,
                api,
                address,
                balance
            };

            setConnectedWallet(connected);
            localStorage.setItem(WALLET_STORAGE_KEY, walletId);
            
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to connect wallet';
            setError(message);
            throw err;
        } finally {
            setIsConnecting(false);
        }
    }, [availableWallets]);

    // Disconnect wallet
    const disconnectWallet = useCallback(() => {
        setConnectedWallet(null);
        localStorage.removeItem(WALLET_STORAGE_KEY);
        setError(null);
    }, []);

    // Refresh balance
    const refreshBalance = useCallback(async () => {
        if (!connectedWallet || !connectedWallet.address) return;
        
        try {
            const balance = await getWalletBalance(connectedWallet.address);
            setConnectedWallet(prev => prev ? { ...prev, balance } : null);
        } catch (err) {
            console.error('Error refreshing balance:', err);
        }
    }, [connectedWallet]);

    const value: WalletContextState = {
        availableWallets,
        connectedWallet,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        refreshBalance
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;