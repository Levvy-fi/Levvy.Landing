// Sale phase types and interfaces for Angel Finance token sale

export type SalePhase = 'pre-sale' | 'public-mint' | 'sale-ended';

export interface SaleConfig {
  startTime: number; // Unix timestamp in milliseconds
  endTime: number;   // Unix timestamp in milliseconds
  targetADA: number; // Total ADA target
  tokenPrice: number; // ADA per token
}

export interface SaleTimerState {
  phase: SalePhase;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isActive: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
}

export interface SalePanelProps {
  phase: SalePhase;
  timerState: SaleTimerState;
  config: SaleConfig;
}

// Angel Finance sale configuration based on mints.yepple.io data
export const ANGEL_SALE_CONFIG: SaleConfig = {
  startTime: 1750510800000, // December 21, 2025, 9:00:00 AM UTC
  endTime: 1750770000000,   // December 24, 2025, 9:00:00 AM UTC
  targetADA: 1332000,       // 1.332M ADA target
  tokenPrice: 3             // 3 ADA per token
};