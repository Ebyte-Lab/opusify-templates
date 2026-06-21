import { useEffect } from 'react';
import { useStore } from './useStore';
import { initialTickers } from '../data/tickerSymbols';

export function useTickerFeed() {
  const tickers = useStore((state) => state.tickers);
  const updateTicker = useStore((state) => state.updateTicker);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random ticker to drift
      const randomIndex = Math.floor(Math.random() * initialTickers.length);
      const targetTicker = initialTickers[randomIndex];
      const currentTicker = useStore.getState().tickers[randomIndex];

      const direction = Math.random() > 0.45 ? 1 : -1;
      const percentageChange = Math.random() * targetTicker.drift;
      const delta = currentTicker.value * percentageChange * direction;
      
      const newValue = currentTicker.value + delta;
      const newDeltaPct = percentageChange * 100 * direction;
      const flashDirection = direction > 0 ? 'up' : 'down';

      // Update the store
      updateTicker(currentTicker.id, newValue, newDeltaPct, flashDirection);

      // Clear flash direction after 1 second so it can be re-triggered later
      setTimeout(() => {
        const latest = useStore.getState().tickers[randomIndex];
        if (latest && latest.flashDirection === flashDirection) {
          updateTicker(latest.id, latest.value, latest.deltaPct, null);
        }
      }, 1000);

    }, 3000);

    return () => clearInterval(interval);
  }, [updateTicker]);

  return tickers;
}
