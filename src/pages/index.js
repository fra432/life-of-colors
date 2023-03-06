import React from "react";
import { Paint, FooterBanner } from "../components";
import { client } from "../../lib/client";
import { useStateContext } from "@/context/StateContext";

const Home = ({ paints, bannerData }) => {
  return (
    <>
      <div className="paints-heading">
        <h2>Paint you life</h2>
        <p>By Marina Mytnik</p>
      </div>
      <div className="paints-container">
        {paints?.map((paint) => (
          <Paint key={paint._id} paint={paint} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'paint']";
  const paints = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      paints,
      bannerData,
    },
  };
};

export default Home;
