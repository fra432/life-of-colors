import getStripe from "lib/getStripe";
import { useState } from "react";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import { client, urlFor } from "../../../lib/client";

const PaintDetails = ({ paint, paints }) => {
  if (!paint) return <div>Paint not found</div>;
  if (!paints) return <div>Paints not found</div>;

  const [openImage, setOpenImage] = useState(false);

  const { name, image, details, price } = paint;

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: [paint] }),
    });

    if (response.stausCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting to checkout...");

    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <div className="paint-detail-container">
      <div>
        <div className="image-container">
          <img
            className="paint-detail-image"
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt={name}
            onClick={() => setOpenImage(true)}
          />
          {/*    <div className="small-images-container">
              {image?.map((img, index) => (
                <img
                  src={urlFor(img)}
                  key={index}
                  className="small-image"
                  onMouseEnter={() => {}}
                />
              ))}
            </div> */}
        </div>
      </div>
      <div className="paint-detail-desc">
        <h1 className="paint-details-name">{name}</h1>
        <h4>Details:</h4>
        <p>{details}</p>
        <p className="price">{`${price > 1 ? price + ".00€" : price + "€"}`}</p>
        <p>Press the image to enlarge</p>
        <div className="buttons">
          <button type="button" className="buy-now" onClick={handleCheckout}>
            Buy now
          </button>
        </div>
      </div>
      {openImage && (
        <div className="full-image-container">
          <TiDeleteOutline
            className="exit-icon"
            onClick={() => setOpenImage(false)}
          />
          <img src={urlFor(image && image[0])} />
        </div>
      )}
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'paint'] {
    slug {
      current
    }
  }`;
  const paints = await client.fetch(query);

  const paths = paints.map((paint) => ({
    params: { slug: paint.slug.current },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "paint" && slug.current == '${slug}'][0]`;
  const paintsQuery = '*[_type == "paint"]';

  const paint = await client.fetch(query);
  const paints = await client.fetch(paintsQuery);

  return {
    props: { paints, paint },
  };
};

export default PaintDetails;
