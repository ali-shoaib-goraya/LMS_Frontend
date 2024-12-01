import React from "react";
import "../styles/ProgramBatchForm.css";

const ProgramBatch = () => {
  return (
    <div className="main-container">
      <div className="title-container">
        <h2>Create Program Batch</h2>
      </div>
      <div className="form-container">
        <form>
          <div className="row">
          <div className="form-group">
            <label>Program</label>
            <select>
              <option>- Select -</option>
              <option value="computer-science">Computer Science</option>
              <option value="electrical-engineering">Electrical Engineering</option>
            </select>
          </div>

            <div className="form-group">
              <label>Academic Year</label>
              <select>
                <option>- Select -</option>
                {/* Add academic year options here */}
              </select>
            </div>
            <div className="form-group">
              <label>Sections</label>
              <input type="text" placeholder="A,B,C" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Program Batch</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>No. of Sessions</label>
              <input type="number" placeholder="8" />
            </div>
            <div className="form-group">
              <label>PLO Passing Threshold</label>
              <input type="number" placeholder="50" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Status</label>
              <input type="text" placeholder="Active" />
            </div>
            <div className="form-group">
              <label>Use in OBE</label>
              <input type="text" placeholder="Yes" />
            </div>
            <div className="form-group">
              <label>Marks %</label>
              <input type="number" placeholder="70" />
            </div>
            <div className="form-group">
              <label>Students %</label>
              <input type="number" placeholder="80" />
            </div>
            <div className="form-group">
              <label>Theory Credit Hours</label>
              <input type="number" />
            </div>
            <div className="form-group">
              <label>Lab Credit Hours</label>
              <input type="number" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Curriculum</label>
              <select>
                <option>- Select -</option>
                {/* Add curriculum options here */}
              </select>
            </div>

            <div className="form-group">
              <label>GPA Policy</label>
              <select>
                <option>- Select -</option>
                {/* Add GPA policy options here */}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Freshman and Sophomore Year Semesters</label>
              <input type="text" placeholder="1,2,3,4" />
            </div>
            <div className="form-group">
              <label>Junior and Senior Year Semesters</label>
              <input type="text" placeholder="5,6,7,8" />
            </div>
            
            <div className="form-group">
              <label>Freshman and Sophomore Year Weight</label>
              <input type="number" placeholder="40" />
            </div>
            <div className="form-group">
              <label>Junior and Senior Year Weight</label>
              <input type="number" placeholder="60" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Indirect Assessment Percentage</label>
              <input type="number" placeholder="0" />
            </div>
            <div className="form-group checkbox-group">
              <input type="checkbox" id="indirect-assessment" />
              <label htmlFor="indirect-assessment">
                Include Indirect Assessment on Student Portal
              </label>
            </div>
          </div>

          <div className="save-button-container">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramBatch;
