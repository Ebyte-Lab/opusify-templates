import { useMemo } from 'react';
import { useStore } from './useStore';
import { exchangeRates } from '../data/exchangeRates';

export function useCurrencyConverter() {
  const amount = useStore((state) => state.converterAmount);
  const base = useStore((state) => state.converterBase);
  const target = useStore((state) => state.converterTarget);

  const setAmount = useStore((state) => state.setConverterAmount);
  const setBase = useStore((state) => state.setConverterBase);
  const setTarget = useStore((state) => state.setConverterTarget);
  const swap = useStore((state) => state.swapConverter);

  const currentRate = useMemo(() => {
    return exchangeRates[base]?.[target] ?? 1;
  }, [base, target]);

  const outputValue = useMemo(() => {
    return amount * currentRate;
  }, [amount, currentRate]);

  return {
    amount,
    base,
    target,
    setAmount,
    setBase,
    setTarget,
    swap,
    currentRate,
    outputValue,
  };
}
