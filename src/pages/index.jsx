import { Paint } from "../components";
import { client } from "../../lib/client";

const Home = ({ paints }) => {
  return (
    <>
      <div className="paints-container">
        {paints?.map((paint) => (
          <Paint key={paint._id} paint={paint} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'paint']";
  const paints = await client.fetch(query);

  return {
    props: {
      paints,
    },
  };
};

export default Home;
