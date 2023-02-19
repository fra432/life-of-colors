import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const onAdd = (paint) => {
    const checkPaintInCart = cartItems?.find((item) => item._id === paint._id);

    if (checkPaintInCart) {
      toast.error("This item is already in your cart");
    } else {
      setCartItems([...cartItems, paint]);
      setTotalQuantities(totalQuantities + 1);
      setTotalPrice(totalPrice + paint.price);
      toast.success(`${paint.name} added to cart`);
    }
  };

  const onRemove = (paint) => {
    const checkPaintInCart = cartItems?.find((item) => item._id === paint._id);

    if (checkPaintInCart) {
      setCartItems(cartItems.filter((item) => item._id !== paint._id));
      setTotalQuantities(totalQuantities - 1);
      setTotalPrice(totalPrice - paint.price);
      toast.success(`${paint.name} removed from cart`);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
