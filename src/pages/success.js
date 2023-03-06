import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="description">
          If you have any questions, please contact us at
          <a href="mailto:mytnikmarina3@gmail.com" className="email">
            mytnikmarina3@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Back to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
