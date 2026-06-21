import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
import { CurrencyCode } from '../../types/transaction';

export const CurrencyConverterCard: React.FC = () => {
  const {
    amount,
    base,
    target,
    setAmount,
    setBase,
    setTarget,
    swap,
    currentRate,
    outputValue,
  } = useCurrencyConverter();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : val);
  };

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <div className="bg-secondary/40 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-white mb-2">Instant Exchange Matrix</h3>
        <p className="text-xs text-text/45 mb-6">Execution calculations via dynamic rates</p>
        
        <div className="space-y-4">
          {/* Funding Currency */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              Funding Currency
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden focus-within:border-primary/45 transition-colors">
              <input 
                type="number" 
                value={amount || ''} 
                onChange={handleAmountChange}
                className="w-full bg-transparent px-4 py-3 outline-none text-white font-mono text-sm"
              />
              <select 
                value={base} 
                onChange={(e) => setBase(e.target.value as CurrencyCode)}
                className="bg-gray-800 border-l border-gray-800 px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
              >
                {currencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-2">
            <button 
              onClick={swap}
              type="button"
              className="p-2 bg-gray-800/60 rounded-lg hover:text-primary transition-colors text-text/50"
              aria-label="Swap base and target currencies"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Settlement Target */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-text/45 mb-2">
              Settlement Target
            </label>
            <div className="flex border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden">
              <input 
                type="text" 
                readOnly 
                value={outputValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                className="w-full bg-transparent px-4 py-3 outline-none text-primary font-mono text-sm cursor-not-allowed"
              />
              <select 
                value={target} 
                onChange={(e) => setTarget(e.target.value as CurrencyCode)}
                className="bg-gray-800 border-l border-gray-800 px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
              >
                {currencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Rate breakdown info */}
      <div className="mt-8 pt-4 border-t border-gray-800/80 text-[10px] font-mono flex items-center justify-between text-text/40">
        <span>ESTIMATED RATE</span>
        <span className="text-white">
          1.00 {base} = {currentRate.toFixed(4)} {target}
        </span>
      </div>
    </div>
  );
};
