import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <img src="" alt="paints" className="hero-banner-image" />

        <div>
          <Link href="/paint/ID">
            <button type="button">BUTTON TEXT</button>
          </Link>
        </div>
        <div className="description">
          <h5>Description</h5>
          <p>DESCRIPTION</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
