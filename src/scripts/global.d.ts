import { CardanoWallet } from './types';

declare global {
  interface Window {
    cardano: Record<string, CardanoWallet>;
  }
}