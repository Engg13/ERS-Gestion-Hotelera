import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Currency, convertPrice, formatPrice } from '../../utils/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (amount: number, fromCurrency: Currency) => number;
  formatPrice: (amount: number, fromCurrency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('CLP');

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('grandhotel_currency');
    if (savedCurrency === 'CLP' || savedCurrency === 'USD') {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency to localStorage when it changes
  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('grandhotel_currency', newCurrency);
  };

  const handleConvertPrice = (amount: number, fromCurrency: Currency = 'CLP'): number => {
    return convertPrice(amount, fromCurrency, currency);
  };

  const handleFormatPrice = (amount: number, fromCurrency: Currency = 'CLP'): string => {
    const converted = convertPrice(amount, fromCurrency, currency);
    return formatPrice(converted, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertPrice: handleConvertPrice,
        formatPrice: handleFormatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
