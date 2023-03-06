import { useStateContext } from "@/context/StateContext";
import Head from "next/head";
import { useEffect } from "react";
import { Footer, Navbar } from "..";

const Layout = ({ children }) => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    const totalPrice = localStorage.getItem("totalPrice");
    const totalQuantities = localStorage.getItem("totalQuantities");

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }

    if (totalPrice) {
      setTotalPrice(JSON.parse(totalPrice));
    }

    if (totalQuantities) {
      setTotalQuantities(JSON.parse(totalQuantities));
    }
  }, []);

  return (
    <div className="layout">
      <Head>
        <title>Life of Colors</title>
      </Head>
      <header>
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </header>
    </div>
  );
};

export default Layout;
