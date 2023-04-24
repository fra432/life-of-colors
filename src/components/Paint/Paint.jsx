import React from "react";
import Link from "next/link";
import { urlFor } from "../../../lib/client";
import style from "./Paint.module.css";

const Paint = ({ paint: { image, name, slug, sold } }) => {
  return (
    <div>
      <Link href={`/paint/${slug.current}`}>
        <div className={`${style["paint-card"]} ${sold ? style.sold : ""}`}>
          <div className={style["paint-image"]}>
            <img
              src={urlFor(image && image[0])}
              width={"50%"}
              alt={name}
              className={style["image"]}
            />
            {sold && (
              <>
                <div className={style["item-sold"]}></div>
                <div className={style["item-sold-text"]}>Sold</div>
              </>
            )}
          </div>
          {/* <p className={style["paint-name"]}>{name}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Paint;
