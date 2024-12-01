import React from "react";
import "../styles/SemesterForm.css"; // Link to CSS file

const SemesterForm = () => {
  return (
    <div className="form-container">
      <h1 className="form-title">Create Semester</h1>
      <div className="title-separator"></div> {/* Separator Line */}
      <form>
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Academic Year</label>
            <select defaultValue="">
              <option value="" disabled>- Select -</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter semester name" />
          </div>
          <div className="form-group">
            <label>GPA Round Method</label>
            <select>
              <option>- Select -</option>
              <option>Round</option>
              <option>Ceil</option>
              <option>Floor</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="form-group half-width">
            <label>Attendance Cutoff Date</label>
            <input type="date" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Show Result in Transcript (GPA)
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Show GPA Result to Students
            </label>
          </div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Show OBE Result to Students
            </label>
          </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea rows="3" placeholder="Enter any additional notes"></textarea>
          </div>
        </div>

        {/* Save Button */}
        <div className="form-footer">
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default SemesterForm;
