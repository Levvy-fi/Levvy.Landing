import { useEffect, useState } from 'react';
import { SalePhase, SaleTimerState, SaleConfig, ANGEL_SALE_CONFIG } from '../types/saleTypes';

export const useSaleTimer = (config: SaleConfig = ANGEL_SALE_CONFIG): SaleTimerState => {
  const [timerState, setTimerState] = useState<SaleTimerState>({
    phase: 'pre-sale',
    timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    isActive: false,
    hasStarted: false,
    hasEnded: false
  });

  const calculateTimeRemaining = (targetTime: number) => {
    const now = Date.now();
    const distance = targetTime - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const determinePhase = (now: number): SalePhase => {
    if (now < config.startTime) {
      return 'pre-sale';
    } else if (now >= config.startTime && now < config.endTime) {
      return 'public-mint';
    } else {
      return 'sale-ended';
    }
  };

  const updateTimer = () => {
    const now = Date.now();
    const phase = determinePhase(now);
    
    let targetTime: number;
    let timeRemaining: { days: number; hours: number; minutes: number; seconds: number };

    switch (phase) {
      case 'pre-sale':
        // Countdown to sale start
        targetTime = config.startTime;
        timeRemaining = calculateTimeRemaining(targetTime);
        break;
      
      case 'public-mint':
        // Countdown to sale end
        targetTime = config.endTime;
        timeRemaining = calculateTimeRemaining(targetTime);
        break;
      
      case 'sale-ended':
        // Sale has ended
        timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        break;
      
      default:
        timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const hasStarted = now >= config.startTime;
    const hasEnded = now >= config.endTime;
    const isActive = hasStarted && !hasEnded;

    setTimerState({
      phase,
      timeRemaining,
      isActive,
      hasStarted,
      hasEnded
    });
  };

  useEffect(() => {
    // Update immediately
    updateTimer();

    // Set up interval to update every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [config.startTime, config.endTime]);

  return timerState;
};