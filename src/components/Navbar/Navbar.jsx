import Link from "next/link";
import { useRouter } from "next/router";
import style from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const isAboutPage = router.pathname === "/about";

  return (
    <div className={style["navbar-container"]}>
      <Link href="/">
        <div
          className={`${style["title-container"]} ${
            !isAboutPage ? style.active : ""
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
    </div>
  );
};

export default Navbar;
