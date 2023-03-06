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

      //save everything on local storage
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, paint]));
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(totalPrice + paint.price)
      );
      localStorage.setItem(
        "totalQuantities",
        JSON.stringify(totalQuantities + 1)
      );
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

    //save everything on local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== paint._id))
    );
    localStorage.setItem(
      "totalPrice",
      JSON.stringify(totalPrice - paint.price)
    );
    localStorage.setItem(
      "totalQuantities",
      JSON.stringify(totalQuantities - 1)
    );
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
