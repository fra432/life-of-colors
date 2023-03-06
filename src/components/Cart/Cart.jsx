import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "lib/client";
import style from "./Cart.module.css";
import getStripe from "lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setCartItems,
    setShowCart,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.stausCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting to checkout...");

    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <div className={style["cart-wrapper"]} ref={cartRef}>
      <div className={style["cart-container"]}>
        <button
          type="button"
          className={style["cart-heading"]}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={style.heading}>Your Cart</span>
          <span className={style["cart-num-items"]}>
            ({totalQuantities} items)
          </span>
        </button>

        {cartItems.length === 0 && (
          <div className={style["empty-cart"]}>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className={style.btn}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className={style["paints-container"]}>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className={style.paint} key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className={style["cart-paint-image"]}
                />
                <div className={style["item-desc"]}>
                  <div className={`${style.flex} ${style.top}`}>
                    <h5>{item.name}</h5>
                    <h4>{item.price}€</h4>
                  </div>
                </div>
                <button
                  type="button"
                  className={style["remove-item"]}
                  onClick={() => {
                    onRemove(item);
                  }}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className={style["cart-bottom"]}>
            <div className={style.total}>
              <h3>Subtotal:</h3>
              <h3>{totalPrice}€</h3>
            </div>
            <div className={style["btn-container"]}>
              <button
                type="button"
                className={style.btn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
