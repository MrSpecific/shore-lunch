import { useState, createContext, useContext } from 'react';

export const AppContext = createContext({
  template: '',
});

export const AppContextProvider = ({ children, domElement }) => {
  const [globalData, setGlobalData] = useState({});
  const [products, setProducts] = useState([]);
  const [navIsActive, setNavIsActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(null);
  const [klaviyoEmbedRef, setKlaviyoEmbedRef] = useState(null);

  const context = {
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
