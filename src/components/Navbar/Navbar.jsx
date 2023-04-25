import Link from "next/link";
import { useRouter } from "next/router";
import style from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isAboutPage = router.pathname === "/about";
  const isContactPage = router.pathname === "/contact";

  console.log(isContactPage);

  return (
    <div className={style["navbar-container"]}>
      <Link href="/">
        <div
          className={`${style["title-container"]} ${
            isHomePage ? style.active : ""
          }`}
        >
          Gallery
        </div>
      </Link>
      <Link href="/about">
        <div
          className={`${style["title-container"]} ${
            isAboutPage ? style.active : ""
          }`}
        >
          About
        </div>
      </Link>
      <Link href="/contact">
        <div
          className={`${style["title-container"]} ${
            isContactPage ? style.active : ""
          }`}
        >
          Contact
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
