import React from "react";
import "../styles/SchoolForm.css";

const SchoolForm = () => {
  return (
    <div className="main-container">
      <div className="title-container">
        <h2>Create School Form</h2>
        <hr className="title-line" />
      </div>
      <div className="form-container">
        <form>
          {/* Campus Input */}
          <div className="row">
            <div className="form-group">
              <label>Campus</label>
              <input type="text" placeholder="Namal Campus" className="form-input" />
            </div>
          </div>

          {/* School Name, Short Name, City */}
          <div className="row">
            <div className="form-group">
              <label>School Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>Short Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" className="form-input" />
            </div>
          </div>

          {/* Checkbox for Academic */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="indirect-assessment" className="checkbox-input" />
            <label htmlFor="indirect-assessment">Academic?</label>
          </div>

          {/* Address and Notes */}
          <div className="row">
            <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-input1" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Notes</label>
              <input type="text" className="form-input1" />
            </div>
          </div>

          {/* Save Button */}
          <div className="save-button-container">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolForm;
