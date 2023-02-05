import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">MENU</Link>
      </p>

      <button className="cart-icon" type="button" onClick={() => {}}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
