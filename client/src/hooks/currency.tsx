import { createContext, useCallback, useState, useContext, FC } from 'react';

interface CurrencyContextData {
  currency: 'usd' | 'brl';
  updateCurrency(currency: 'usd' | 'brl'): void;
}

const CurrencyContext = createContext<CurrencyContextData>({} as CurrencyContextData);

const CurrencyProvider: FC = ({ children }) => {
  const [currencyState, setCurrencyState] = useState<'usd' | 'brl'>('usd');

  const updateCurrency = useCallback(
    (currency: 'usd' | 'brl') => {
      setCurrencyState(currency);
    },
    [setCurrencyState],
  );

  return (
    <CurrencyContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ currency: currencyState, updateCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

function useCurrency(): CurrencyContextData {
  const context = useContext(CurrencyContext);

  return context;
}

export { CurrencyProvider, useCurrency };