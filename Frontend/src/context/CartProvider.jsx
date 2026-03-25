import React, { useReducer, useContext, useEffect } from "react";
import CartContext from "./CartContext";
import { AuthContext } from "./AuthContext";
import { cartAPI } from "../services/api";
import toast from "react-hot-toast";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

function cartReducer(state, action) {
  let updatedState;

  switch (action.type) {
    case "SET_CART":
      updatedState = { items: action.payload };
      break;

    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItemIndex !== -1) {
        updatedState = {
          ...state,
          items: state.items.map((item, index) =>
            index === existingItemIndex
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
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
      break;

    case "INCREASE_QUANTITY":
      updatedState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
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
            item.id === action.payload.id && item.size === action.payload.size
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

  localStorage.setItem("cartItems", JSON.stringify(updatedState.items));
  return updatedState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useContext(AuthContext);

  // Sync cart when user auth status changes
  useEffect(() => {
    if (user) {
      cartAPI.getCart().then(({ data }) => {
        const formattedItems = data.map((c) => ({
          ...c.product,
          quantity: c.quantity,
          size: c.size || "",   // ← was missing! Size must come from cart item, not product
        }));
        dispatch({ type: "SET_CART", payload: formattedItems });
      }).catch(err => console.error("Error fetching cart from API", err));
    } else {
      // Clear cart on logout/guest
      dispatch({ type: "CLEAR_CART" });
    }
  }, [user]);

  const addToCart = async (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.title} (${product.size}) added to cart!`);
    if (user) {
      try {
        await cartAPI.addToCart(product.id, 1, product.size);
      } catch (err) {
        console.error("API error", err);
      }
    }
  };

  const removeFromCart = async (id, size) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, size } });
    if (user) {
      try {
        await cartAPI.removeFromCart(id);
      } catch (err) {
        console.error("API error", err);
      }
    }
  };

  const increaseQuantity = async (id, size) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id, size } });
    if (user) {
      try {
        const item = state.items.find(i => i.id === id && i.size === size);
        if (item) {
          await cartAPI.updateCartItem(id, item.quantity + 1);
        }
      } catch (err) {
        console.error("API error", err);
      }
    }
  };

  const decreaseQuantity = async (id, size) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id, size } });
    if (user) {
      try {
        const item = state.items.find(i => i.id === id && i.size === size);
        if (item && item.quantity > 1) {
          await cartAPI.updateCartItem(id, item.quantity - 1);
        } else if (item && item.quantity === 1) {
          await cartAPI.removeFromCart(id);
        }
      } catch (err) {
        console.error("API error", err);
      }
    }
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });
    if (user) {
      try {
        await cartAPI.clearCart();
      } catch (err) {
        console.error("API error", err);
      }
    }
  };

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
