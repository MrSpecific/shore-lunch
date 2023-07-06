import { useState, createContext, useContext } from 'react';

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const context = {
    currency,
    setCurrency,
  };

  return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);

export default CartContext;
