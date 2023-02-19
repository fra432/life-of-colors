import Link from "next/link";
import style from "./Navbar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Cart } from "../index";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  console.log(totalQuantities);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">MENU</Link>
      </p>

      <button
        className={style["cart-icon"]}
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        {totalQuantities > 0 && (
          <span className="cart-item-qty">{totalQuantities}</span>
        )}
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
