import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

function cartReducer(state, action) {
  let updatedState;

  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        updatedState = {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        updatedState = {
          ...state,
          items: [...state.items, { ...product, quantity: 1 }],
        };
      }
      break;
    }

    case "REMOVE_FROM_CART":
      updatedState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      break;

    case "INCREASE_QUANTITY":
      updatedState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      break;

    case "DECREASE_QUANTITY":
      updatedState = {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
      break;

    case "CLEAR_CART":
      updatedState = { items: [] };
      break;

    default:
      return state;
  }

  // تحديث LocalStorage بعد كل تعديل
  localStorage.setItem("cartItems", JSON.stringify(updatedState.items));
  return updatedState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const increaseQuantity = (id) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  const decreaseQuantity = (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
