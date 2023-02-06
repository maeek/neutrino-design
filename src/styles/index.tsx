import { createContext, ReactNode, useContext } from 'react';
import { NeutrinoTheme } from './types';
import { defaultDarkTheme } from './default-themes';

export const NeutrinoThemeContext = createContext<NeutrinoTheme | undefined>(undefined);

export interface NeutrinoProviderProps {
  theme: NeutrinoTheme;
  children: ReactNode;
  normalizeCss?: boolean;
}

export const NeutrinoProvider = ({ theme = defaultDarkTheme, children }: NeutrinoProviderProps) => {

  return (
    <NeutrinoThemeContext.Provider value={theme}>
      {children}
    </NeutrinoThemeContext.Provider>
  );
};

export const useNeutrino = () => {
  const neutrino = useContext(NeutrinoThemeContext);

  if (neutrino === undefined) {
    throw new Error('NeutrinoProvider not found');
  }

  return neutrino;
};
