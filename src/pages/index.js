import React from "react";
import { Paint, HeroBanner, FooterBanner } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="paints-heading">
        <h2>Life of Colors</h2>
        <p>By Marina Mytnik</p>
      </div>
      <div className="paints-container">
        {[
          "Product 1",
          "Product 2",
          "Product 3",
          "Product 4",
          "Product 5",
          "Product 6",
          "Product 7",
          "Product 8",
        ].map((product) => product)}
      </div>
      <FooterBanner />
    </>
  );
};

export default Home;
