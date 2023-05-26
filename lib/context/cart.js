import { createContext, useState, useReducer, useContext, useEffect } from 'react';
import commerce from '@lib/commerce';
import { set } from 'sanity';

const { log } = console;

const CartMetaContext = createContext();
const CartDispatchContext = createContext();
const CartStateContext = createContext();

const SET_CART = 'SET_CART';
const CART_SHOULD_DISPLAY = 'CART_SHOULD_DISPLAY';

const cartMetaInitialState = {
  shouldDisplayCart: false,
  errorMessage: null,
};

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
  loading: false,
};

const cartMetaReducer = (cartState, action) => {
  switch (action.type) {
    case CART_SHOULD_DISPLAY:
      return { ...cartState, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const cartStateReducer = (cartState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...cartState, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [cartMeta, dispatchCartMeta] = useReducer(cartMetaReducer, cartMetaInitialState);
  const [cartState, dispatch] = useReducer(cartStateReducer, initialState);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCart = async () => {
    try {
      return await commerce.cart.retrieve();
    } catch (err) {
      console.log(err);
    }
  };

  const setCart = (payload) => dispatch({ type: SET_CART, payload });
  const setIsLoading = (payload) => dispatch({ type: SET_CART, payload: { loading: payload } });

  const refreshCart = async () => {
    try {
      const cart = await getCart();

      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  };

  const cartAction = async (action = () => {}) => {
    setIsLoading(true);
    await action();
    setIsLoading(false);
  };

  const addToCart = async (productId, quantity = 1, variantData = null) => {
    cartAction(async () => {
      const response = await commerce.cart.add(productId, quantity, variantData);
      // console.log('response is ', response);
      const { success, cart } = response;
      if (success) {
        setCart(cart);
        openCart();
      }
    });
  };

  const incrementItem = async (productId, options = { quantity: 1 }) => {
    commerce.cart.update(productId, options).then((response) => console.log(response));
  };

  const decrementItem = async (productId, options = { quantity: -1 }) => {
    commerce.cart.update(productId, options).then((response) => console.log(response));
  };

  const removeItem = async (productId) => {
    cartAction(() => {
      commerce.cart.remove(productId).then((res) => {
        log('res is ', res);
        if (res.success) {
          refreshCart();
        }
      });
    });
    // const newCart = await commerce.cart.remove(productId);
    // log('newCart:', newCart);
  };

  const openCart = () =>
    dispatchCartMeta({ type: CART_SHOULD_DISPLAY, payload: { shouldDisplayCart: true } });

  const closeCart = () =>
    dispatchCartMeta({ type: CART_SHOULD_DISPLAY, payload: { shouldDisplayCart: false } });

  const handleCheckout = () => {
    if (!cartState.hosted_checkout_url) return;

    setIsLoading(true);
    window.location = cartState.hosted_checkout_url;
  };

  return (
    <CartMetaContext.Provider value={{ ...cartMeta, openCart, closeCart }}>
      <CartDispatchContext.Provider
        value={{ setCart, addToCart, incrementItem, decrementItem, removeItem, handleCheckout }}
      >
        <CartStateContext.Provider value={cartState}>{children}</CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </CartMetaContext.Provider>
  );
};

export const useCartMeta = () => useContext(CartMetaContext);
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
