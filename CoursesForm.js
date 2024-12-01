import React, { useState } from "react";
import "../styles/CoursesForm.css";

function CoursesForm() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    const { value } = e.target;
    // If the checkbox is clicked, it toggles selection (ensuring only one is selected at a time)
    if (selectedOption === value) {
      setSelectedOption(""); // Deselect the checkbox if it's clicked again
    } else {
      setSelectedOption(value); // Select the clicked checkbox
    }
  };

  return (
    <div className="form-container">
      {/* Row 1 */}
      <div className="form-row">
        <div className="form-group">
          <label>Code</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="status"
              value="Active"
              checked={selectedOption === "Active"}
              onChange={handleOptionChange}
            />{" "}
            Active
          </label>
          <label>
            <input
              type="checkbox"
              name="status"
              value="Supervisor Based"
              checked={selectedOption === "Supervisor Based"}
              onChange={handleOptionChange}
            />{" "}
            Supervisor Based
          </label>
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-group">
          <label>Delivery Format</label>
          <input type="text" value="Theory" readOnly />
        </div>
        <div className="form-group small-input">
          <label>Theory</label>
          <input type="number" defaultValue="0" />
        </div>
        <div className="form-group small-input">
          <label>Lab</label>
          <input type="number" defaultValue="0" />
        </div>
        <div className="form-group small-input">
          <label>Tutorial</label>
          <input type="number" defaultValue="0" />
        </div>
        <div className="form-group">
          <label>Base Type</label>
          <input type="text" value="CLO Based" readOnly />
        </div>
      </div>

      {/* Row 3 */}
      <div className="form-row">
        <div className="form-group">
          <label>Department</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
        <div className="form-group">
          <label>Course Level</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
        <div className="form-group">
          <label>Knowledge Area</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="form-row">
        <div className="form-group">
          <label>Connected Course</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
        <div className="form-group">
          <label>Alternative Courses</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
      </div>

      {/* Row 5 */}
      <div className="form-row">
        <div className="form-group">
          <label>Knowledge Profiles</label>
          <select>
            <option value="">- Select -</option>
          </select>
        </div>
      </div>

      {/* Row 6 */}
      <div className="form-row">
        <div className="form-group">
          <label>Objectives</label>
          <textarea rows="3"></textarea>
        </div>
      </div>

      {/* Row 7 */}
      <div className="form-row">
        <div className="form-group">
          <label>Notes</label>
          <textarea rows="3"></textarea>
        </div>
      </div>

      {/* Save Button */}
      <div className="form-row">
        <button className="save-button">Save</button>
      </div>
    </div>
  );
}

export default CoursesForm;
