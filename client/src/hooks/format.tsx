import { createContext, useCallback, useState, useContext, FC } from 'react';

interface FormatContextData {
  format: 'btc' | 'sat';
  updateFormat(format: 'btc' | 'sat'): void;
}

const FormatContext = createContext<FormatContextData>({} as FormatContextData);

const FormatProvider: FC = ({ children }) => {
  const [formatState, setFormatState] = useState<'btc' | 'sat'>('btc');

  const updateFormat = useCallback(
    (format: 'btc' | 'sat') => {
      setFormatState(format);
    },
    [setFormatState],
  );

  return (
    <FormatContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ format: formatState, updateFormat }}
    >
      {children}
    </FormatContext.Provider>
  );
};

function useFormat(): FormatContextData {
  const context = useContext(FormatContext);

  return context;
}

export { FormatProvider, useFormat };