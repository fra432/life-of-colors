import { client, urlFor } from "../../lib/client";

const About = ({ about }) => {
  return (
    <div className="about-container">
      <div className="image-container">
        <img src={urlFor(about[0].image)} alt="The painter, Marina" />;
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
