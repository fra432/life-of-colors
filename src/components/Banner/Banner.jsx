import Link from "next/link";
import style from "./Banner.module.css";
import { client } from "../../../lib/client";

const Banner = () => {
  return (
    <div className={style["banner-container"]}>
      <Link href="/" className={style.logo}>
        <h2>Paint you life</h2>
        <p>By Marina Mytnik</p>
      </Link>
      <div className={style["banner-overlay"]}></div>
      <img className={style["banner-image"]} src="/assets/banner.png" alt="" />
    </div>
  );
};

export default Banner;
