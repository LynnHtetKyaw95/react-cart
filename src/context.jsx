import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEM,
} from "./actions";
import cartItems from "./data";
import { getTotals } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: false,
  // cart: new Map(cartItems.map((item) => [item.id, item])),
  cart: new Map(),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalPrice, totalQty } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increaseQty = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decreaseQty = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(url);
    const cart = await res.json();
    dispatch({ type: DISPLAY_ITEM, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseQty,
        decreaseQty,
        totalPrice,
        totalQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
