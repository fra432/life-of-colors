import { Form } from "../components";

const contact = () => {
  return (
    <div className="contact-page-contanier" style={{ width: "70%" }}>
      <div className="info-image">
        <p>
          Fill out the form below to get in touch with me regarding custom
          paintings, murals, or any other questions you may have. I'll respond
          as soon as possible and look forward to discussing your project
          further.
        </p>
        <img className="image" src="assets/tulip.png" height={100} />
      </div>
      <div className="form-container">
        <Form />
      </div>
    </div>
  );
};

export default contact;
