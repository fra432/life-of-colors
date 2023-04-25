import { client, urlFor } from "../../lib/client";

const About = ({ about }) => {
  return (
    <div className="about-container">
      <div className="about-image-container">
        <img src={urlFor(about[0].image)} alt="The painter, Marina" />
      </div>
      <div className="description-container">
        <p>
          As a Belarusian artist currently based in Italy, I am deeply
          passionate about experimentation and enjoy using a variety of
          techniques to create dynamic and expressive pieces that blend
          materials, paints, and styles.
        </p>
        <br />
        <p>
          I find inspiration from a wide range of sources, including nature,
          literature, and the world around me, and seek to translate these
          influences into unique and captivating artworks.
        </p>
        <br />
        <p>
          One of my favorite canvases to work on is the wall, the larger the
          surface, the wider the imagination!
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'about']";
  const about = await client.fetch(query);

  return {
    props: {
      about,
    },
  };
};

export default About;
