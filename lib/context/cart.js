import { createContext, useState, useReducer, useContext, useEffect } from 'react';
import commerce from '@lib/commerce';
import { set } from 'sanity';

const CartMetaContext = createContext();
const CartDispatchContext = createContext();
const CartStateContext = createContext();

const SET_CART = 'SET_CART';
const CART_SHOULD_DISPLAY = 'CART_SHOULD_DISPLAY';

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
  loading: false,
  shouldDisplayCart: false,
};

const cartMetaReducer = (state, action) => {
  switch (action.type) {
    case CART_SHOULD_DISPLAY:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const cartStateReducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [cartMeta, dispatchCartMeta] = useReducer(cartMetaReducer, { shouldDisplayCart: false });
  const [state, dispatch] = useReducer(cartStateReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshCart();
  }, []);

  const getCart = async () => {
    try {
      return await commerce.cart.retrieve();
    } catch (err) {
      console.log(err);
    }
  };

  const setCart = (payload) => dispatch({ type: SET_CART, payload });

  const refreshCart = async () => {
    try {
      const cart = await getCart();

      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId, quantity = 1, variantData = null) => {
    setIsLoading(true);
    const response = await commerce.cart.add(productId, quantity, variantData);
    console.log('response is ', response);
    const { success, cart } = response;
    if (success) {
      setCart(cart);
      openCart();
    }
    setIsLoading(false);
  };

  const openCart = () =>
    dispatchCartMeta({ type: CART_SHOULD_DISPLAY, payload: { shouldDisplayCart: true } });

  const closeCart = () =>
    dispatchCartMeta({ type: CART_SHOULD_DISPLAY, payload: { shouldDisplayCart: false } });

  return (
    <CartMetaContext.Provider value={{ ...cartMeta, openCart, closeCart }}>
      <CartDispatchContext.Provider value={{ setCart, addToCart, isLoading }}>
        <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </CartMetaContext.Provider>
  );
};

export const useCartMeta = () => useContext(CartMetaContext);
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
