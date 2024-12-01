import React from "react";
import "../styles/CampusForm.css"; // Importing the CSS file

const CustomForm = () => {
  return (
    <div className="form-container">
      <div className="title-container">
        <h2 className="form-title">Create Your Form</h2>
      </div>

      <div className="form-content-container">
        <form className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input form-input-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shortName" className="form-label">Short Name</label>
              <input
                type="text"
                id="shortName"
                name="shortName"
                className="form-input form-input-short-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                className="form-input form-input-type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-input form-input-city"
              />
            </div>
          </div>

          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomForm;
