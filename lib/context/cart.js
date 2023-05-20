import { createContext, useReducer, useContext, useEffect } from 'react';
import { observer, observable } from '@legendapp/state';
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
// import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

configureObservablePersistence({
  // Use Local Storage on web
  persistLocal: ObservablePersistLocalStorage,
  // Use react-native-mmkv in React Native
  // persistLocal: ObservablePersistMMKV
});

import commerce from '@lib/commerce';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = 'SET_CART';

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
  loading: false,
  shouldDisplayCart: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCart();
  }, []);

  const setCart = (payload) => dispatch({ type: SET_CART, payload });

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();

      setCart(cart);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartDispatchContext.Provider value={{ setCart }}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

// Create an observable object
export const cartState = observable({ ...initialState });
export const cartCount = observable(0);

persistObservable(cartState, {
  local: 'storeCartState', // Unique name
});

persistObservable(cartCount, {
  local: 'storeCartCount', // Unique name
});

export const cart = {
  state: cartState,
  count: cartCount,
  increment() {
    cartCount.set((v) => v + 1);
  },
};
