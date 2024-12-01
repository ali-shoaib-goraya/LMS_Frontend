import React from "react";
import "../styles/UsersForm.css";

const UserForm = () => {
  return (
    <div className="main-container">
      <div className="form-container">
        <form>
          <div className="row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="example@domain.com" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" placeholder="Department Admin" />
            </div>
            <div className="form-group">
              <label>School</label>
              <input type="text" placeholder="All Schools" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Status</label>
              <input type="text" placeholder="Active" />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input type="text" placeholder="Teacher" />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input type="text" placeholder="Male"/>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Highest Degree</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Faculty Type</label>
              <input type="text" placeholder="Full Time Regular Faculty" />
            </div>
            <div className="form-group">
              <label>CNIC</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Joining Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Leaving Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Work Mobile</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Alternate Mobile</label>
              <input type="text" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Work Phone</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Departments</label>
              <input type="text" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Other Departments</label>
              <input type="text" />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="isPhD" />
            <label htmlFor="isPhD">Is PhD?</label>
          </div>
          
          <div className="save-button-container">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
