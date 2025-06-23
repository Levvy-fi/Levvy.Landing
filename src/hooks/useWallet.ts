import { useContext } from 'react';
import WalletContext, { type WalletContextState } from '../contexts/WalletContext';

/**
 * Hook to access wallet functionality
 * @returns WalletContextState with all wallet operations
 * @throws Error if used outside of WalletProvider
 */
export function useWallet(): WalletContextState {
    const context = useContext(WalletContext);
    
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    
    return context;
}