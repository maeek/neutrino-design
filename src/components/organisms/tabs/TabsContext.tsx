import { useCallback } from '@storybook/addons';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface Tab {
  index: number;
  node: ReactNode;
  children: ReactNode;
}

interface TabsContext {
  selectedTab: Tab;
  selectTab: (tab: Tab) => void;
}

const tabsContext = createContext<TabsContext | null>(null);

export const useTabContext = () => {
  const context = useContext(tabsContext);

  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }

  return context;
};

export const TabProvider = ({ children }) => {
  const [ selectedTab, setSelectedTab ] = useState(null);

  const selectTab = useCallback((index) => {
    setSelectedTab(index);
  }, []);

  return (
    <tabsContext.Provider value={{ selectedTab, selectTab }}>
      {children}
    </tabsContext.Provider>
  );
};
