import React, { createContext, useState } from 'react';

interface LibraryContextType {
  activeTab: string;
  switchTab: (tab: string) => void;
}

const LibraryContext = createContext<LibraryContextType>({
  activeTab: 'cards',
  switchTab: () => {},
});

export const LibraryContextProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                  children,
                                                                                }) => {
  const [activeTab, setActiveTab] = useState('cards');

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <LibraryContext.Provider value={{ activeTab, switchTab }}>
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
