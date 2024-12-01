import React from "react";
import "../styles/DepartmentForm.css"; // Import CSS for styling

const DepartmentForm = () => {
  return (
    <div className="form-container">
      <form className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="departmentName" className="form-label">Department Name</label>
            <input type="text" id="departmentName" name="departmentName" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="shortName" className="form-label">Short Name</label>
            <input type="text" id="shortName" name="shortName" className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="school" className="form-label">School</label>
            <input type="text" id="school" name="school" placeholder="Faculty of Computer Science" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">Type</label>
            <input type="text" id="type" name="type" placeholder="Academic Department" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="defaultGpa" className="form-label">Default GPA Method</label>
            <input type="text" id="defaultGpa" name="defaultGpa" placeholder="Absolute" className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="attendance" className="form-label">Attendance %</label>
            <input type="number" id="attendance" name="attendance" placeholder="75" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="allowAttendance" className="form-label">Allow Attendance After Days</label>
            <input type="number" id="allowAttendance" name="allowAttendance" placeholder="0" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="lockActivity" className="form-label">Lock Activity Days</label>
            <input type="number" id="lockActivity" name="lockActivity" placeholder="0" className="form-input" />
          </div>

          <div className="form-group">
            <label htmlFor="assessmentMethod" className="form-label">Assessment Method</label>
            <input type="text" id="assessmentMethod" name="assessmentMethod" placeholder="Washington Accord" className="form-input" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group-checkbox spaced-checkbox">
            <input type="radio" id="active" name="status" />
            <label htmlFor="active" className="form-label">Active</label>
          </div>

          <div className="form-group-checkbox spaced-checkbox">
            <input type="radio" id="addCLO" name="status" />
            <label htmlFor="addCLO" className="form-label">Allow faculty to add CLO from Course Section</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="allowedGpaMethods" className="form-label">Allowed GPA Methods</label>
          <input type="text" id="allowedGpaMethods" name="allowedGpaMethods" className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="clearingPersons" className="form-label">Clearing Persons</label>
          <input type="text" id="clearingPersons" name="clearingPersons" className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="replyingPersons" className="form-label">Complaint/Inquiry Replying Persons</label>
          <input type="text" id="replyingPersons" name="replyingPersons" className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="signatorySignature" className="form-label">Signatory Signature</label>
          <input type="file" id="signatorySignature" name="signatorySignature" className="form-file-input" />
        </div>

        <div className="form-group">
          <label htmlFor="vision" className="form-label">Vision</label>
          <textarea id="vision" name="vision" className="form-textarea"></textarea>
        </div>

        <div className="form-buttons">
          <button type="button" className="form-button-cancel">Cancel</button>
          <button type="submit" className="form-button-submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
