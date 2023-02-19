import React from "react";
import Link from "next/link";
import { urlFor } from "../../../lib/client";

const Paint = ({ paint: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/paint/${slug.current}`}>
        <div className="paint-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="paint-image"
            alt={name}
          />
          <p className="paint-name">{name}</p>
          <p className="paint-price">{price}€</p>
        </div>
      </Link>
    </div>
  );
};

export default Paint;
