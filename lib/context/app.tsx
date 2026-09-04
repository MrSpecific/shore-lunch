import { useState, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

export type AppContextValue = {
  template: string;
  globalData: Record<string, any>;
  setGlobalData: Dispatch<SetStateAction<Record<string, any>>>;
  products: any[];
  setProducts: Dispatch<SetStateAction<any[]>>;
  navIsActive: boolean;
  setNavIsActive: Dispatch<SetStateAction<boolean>>;
  headerHeight: number | null;
  setHeaderHeight: Dispatch<SetStateAction<number | null>>;
  klaviyoEmbedRef: React.RefObject<HTMLDivElement> | null;
  setKlaviyoEmbedRef: Dispatch<SetStateAction<React.RefObject<HTMLDivElement> | null>>;
};

export const AppContext = createContext<AppContextValue>({
  template: '',
  globalData: {},
  setGlobalData: () => {},
  products: [],
  setProducts: () => {},
  navIsActive: false,
  setNavIsActive: () => {},
  headerHeight: null,
  setHeaderHeight: () => {},
  klaviyoEmbedRef: null,
  setKlaviyoEmbedRef: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState<Record<string, any>>({});
  const [products, setProducts] = useState<any[]>([]);
  const [navIsActive, setNavIsActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | null>(null);
  const [klaviyoEmbedRef, setKlaviyoEmbedRef] = useState<React.RefObject<HTMLDivElement> | null>(
    null
  );

  const context: AppContextValue = {
    template: '',
    globalData,
    setGlobalData,
    products,
    setProducts,
    navIsActive,
    setNavIsActive,
    headerHeight,
    setHeaderHeight,
    klaviyoEmbedRef,
    setKlaviyoEmbedRef,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
