import { useState, useEffect } from 'react';
import { blazeWalletService } from '../services/BlazeWalletService';

/**
 * React hook for querying wallet balance using Blaze SDK
 * Provides real-time balance updates with error handling and loading states
 */
export function useWalletBalance(address: string, refreshInterval: number = 30000) {
    const [balance, setBalance] = useState<{
        ada: number;
        formatted: string;
        lovelace: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!address) {
            setLoading(false);
            return;
        }

        let intervalId: NodeJS.Timeout;

        const fetchBalance = async () => {
            try {
                setError(null);
                const balanceData = await blazeWalletService.getFormattedBalance(address);
                setBalance(balanceData);
            } catch (err) {
                console.error('Error fetching wallet balance:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch balance');
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchBalance();

        // Set up periodic refresh
        if (refreshInterval > 0) {
            intervalId = setInterval(fetchBalance, refreshInterval);
        }

        // Cleanup
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [address, refreshInterval]);

    return {
        balance,
        loading,
        error,
        refetch: () => {
            if (address) {
                setLoading(true);
                blazeWalletService.getFormattedBalance(address)
                    .then(setBalance)
                    .catch(err => setError(err.message))
                    .finally(() => setLoading(false));
            }
        }
    };
}