import { Paint } from "@/components";
import { useStateContext } from "@/context/StateContext";
import { client, urlFor } from "../../../lib/client";

const PaintDetails = ({ paint, paints }) => {
  if (!paint) return <div>Paint not found</div>;
  if (!paints) return <div>Paints not found</div>;

  const { name, image, details, price } = paint;
  const { onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(paint);

    setShowCart(true);
  };

  return (
    <div>
      <div className="paint-detail-container">
        <div>
          <div className="image-container">
            <img
              className="paint-detail-image"
              src={urlFor(image && image[0])}
              width={250}
              height={250}
              alt={name}
            />
            <div className="small-images-container">
              {image?.map((img, index) => (
                <img
                  src={urlFor(img)}
                  key={index}
                  className="small-image"
                  onMouseEnter={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="paint-detail-desc">
          <h1 className="paint-details-name">{name}</h1>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">{`${
            price > 1 ? price + ".00€" : price + "€"
          }`}</p>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(paint)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-paints-wrapper">
        <h2>Yo may also like</h2>
        <div className="marquee">
          <div className="maylike-paints-container">
            {paints?.map((paint) => (
              <Paint key={paint._id} paint={paint} />
            ))}
          </div>
        </div>
      </div>
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
