import React from "react";
import "../styles/ProgramForm.css"; // Import the custom CSS file

const ProgramForm = () => {
  return (
    <div className="form-container">
      <form>
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Short Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Session Type</label>
            <select>
              <option>Semester</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <select>
              <option>- Select -</option>
            </select>
          </div>
          <div className="form-group">
            <label>Program Level</label>
            <select>
              <option>- Select -</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>No. of Sessions</label>
            <input type="number" placeholder="2" />
          </div>
          <div className="form-group">
            <label>Program Type</label>
            <select>
              <option>- Select -</option>
            </select>
          </div>
          <div className="form-group">
            <label>Marks %</label>
            <input type="number" placeholder="50" />
          </div>
          <div className="form-group">
            <label>Students %</label>
            <input type="number" placeholder="50" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="form-group">
            <label>Assessment Method</label>
            <input type="text" placeholder="None" />
          </div>
          <div className="form-group">
            <label>Learning Type Category</label>
            <input type="text" placeholder="Blooms Taxonomy v.1" />
          </div>
        </div>

        {/* Text Areas */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Vision</label>
            <textarea rows="2"></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label>Mission</label>
            <textarea rows="2"></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Admission Criteria Info</label>
            <textarea rows="2"></textarea>
          </div>
          <div className="form-group">
            <label>Passing Criteria Info</label>
            <textarea rows="2"></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="form-row save-row">
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;
