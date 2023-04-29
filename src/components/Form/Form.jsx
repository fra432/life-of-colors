import { useState } from "react";
import style from "./Form.module.css";
import axios from "axios";

const Form = () => {
  const blankData = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState(blankData);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.message.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      try {
        const response = await axios.post("/api/contact", formData);

        console.log(response.data);
        alert("Message sent!");
      } catch (error) {
        console.log(error);
        alert("Error sending message.");
      }
      setFormData(blankData);
      setErrors({});
    } else {
      // Display validation errors
      setErrors(errors);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit} formNoValidate>
      <legend className={style.label}>Name</legend>
      <fieldset>
        <div className={style.field}>
          <input
            name="firstName"
            type="text"
            id="first-name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? style.error : ""}
          />
          {errors.firstName && (
            <div className={style["error-message"]}>{errors.firstName}</div>
          )}
          <label className={style.sublabel} htmlFor="first-name">
            {!errors.firstName && "Name"}
          </label>
        </div>
        <div className={style.field}>
          <label className={style.sublabel} htmlFor="last-name">
            <input
              name="lastName"
              type="text"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? style.error : ""}
            />
            {!errors.lastName && "Last Name"}
          </label>
          {errors.lastName && (
            <div className={style["error-message"]}>{errors.lastName}</div>
          )}
        </div>
      </fieldset>
      <div className={style.field}>
        <label className={style.label} htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? style.error : ""}
          />
        </label>
        {errors.email && (
          <div className={style["error-message"]}>{errors.email}</div>
        )}
      </div>
      <div className={style.field}>
        <label className={style.label} htmlFor="message">
          Message
          <textarea
            htmlFor="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? style.error : ""}
            autoComplete="nope"
          />
        </label>
        {errors.message && (
          <div className={style["error-message"]}>{errors.message}</div>
        )}
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default Form;
