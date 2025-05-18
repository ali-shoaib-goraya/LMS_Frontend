import React, { useState, useEffect } from "react";
import roleService from "../../../services/roleService";
import departmentService from "../../../services/departmentService";
import facultyService from "../../../services/facultyService";

// User type enum
const UserType = {
  CampusAdmin: "CampusAdmin",
  Teacher: "Teacher",
  Hod: "Hod",
  StaffMember: "StaffMember",
};

// Gender enum
const Gender = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
};

// Employment type enum
const EmploymentType = {
  FullTime: "FullTime",
  PartTime: "PartTime",
};

const UserForm = ({ onBack }) => {
  // State for roles and departments
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initial state with common fields
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: Gender.Male,
    emergencyContact: "",
    // Other user type specific fields
    type: UserType.CampusAdmin,
    departmentIds: [],
    designation: "",
    employmentType: EmploymentType.FullTime,
    qualification: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch roles and departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch roles and departments in parallel
        const [rolesData, departmentsData] = await Promise.all([
          roleService.getRoles(),
          departmentService.getDepartments()
        ]);
        console.log("Roles Data:", rolesData.data);
        console.log("Departments Data:", departmentsData.data.data);
        setRoles(rolesData.data);
        setDepartments(departmentsData.data.data);
        
        // Set default role if roles are available
        if (rolesData.data && rolesData.data.length > 0) {
          setFormData(prevState => ({
            ...prevState,
            role: rolesData.data[0].id
          }));
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load required data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const handleDepartmentChange = (e) => {
    const options = e.target.options;
    const selectedDepartments = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDepartments.push(options[i].value);
      }
    }
    
    setFormData((prevState) => ({
      ...prevState,
      departmentIds: selectedDepartments,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "email",
      "firstName", 
      "lastName",
      "role",
      "password",
      "confirmPassword",
      "address",
      "gender",
      "emergencyContact"
    ];
    
    // Add type-specific required fields (excluding CampusAdmin-specific fields)
    if (formData.type !== UserType.CampusAdmin) {
      requiredFields.push(
        "departmentIds",
        "designation",
        "employmentType",
        "qualification"
      );
    }
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setSubmitError("Passwords do not match");
      return false;
    }
    
    return requiredFields.every((field) => {
      if (field === "departmentIds") {
        return formData[field].length > 0;
      }
      return formData[field];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the data object based on user type
      const requestData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        address: formData.address,
        gender: formData.gender,
        emergencyContact: formData.emergencyContact,
        type: formData.type,
      };

      // Add additional fields for non-CampusAdmin users
      if (formData.type !== UserType.CampusAdmin) {
        requestData.departmentIds = formData.departmentIds;
        requestData.designation = formData.designation;
        requestData.employmentType = formData.employmentType;
        requestData.qualification = formData.qualification;
      }

      // Call the appropriate API based on user type
      if (formData.type === UserType.CampusAdmin) {
        console.log("Creating Campus Admin with data:", requestData);
        await facultyService.createCampusAdmin(requestData);

      } else {
        await facultyService.createFaculty(requestData);
      }

      // Reset form after successful submission
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        role: roles.length > 0 ? roles[0].name : "",
        password: "",
        confirmPassword: "",
        address: "",
        gender: Gender.Male,
        emergencyContact: "",
        type: UserType.CampusAdmin,
        departmentIds: [],
        designation: "",
        employmentType: EmploymentType.FullTime,
        qualification: "",
      });
      
      setIsSubmitted(false);
      setSubmitSuccess(true);
      setSubmitError(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitError(err.response?.data?.message || "Failed to submit form. Please try again.");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return <div className="w-full text-center p-8">Loading form data...</div>;
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="w-full text-center p-8 text-red-500">
        {error}
        <button 
          className="block mx-auto mt-4 px-4 py-2 bg-blue-600 text-white rounded" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <div className="bg-white border border-gray-300 rounded-md p-6 shadow-md">
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            User created successfully!
          </div>
        )}
        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* User Type Selection Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2 mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                User Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleUserTypeChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                required
              >
                {Object.keys(UserType).map((type) => (
                  <option key={type} value={UserType[type]}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Common Fields - First Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                placeholder="example@domain.com"
                required
              />
            </div>
          </div>

          {/* Common Fields - Second Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.role
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Common Fields - Third Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.address
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.gender
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                {Object.keys(Gender).map((gender) => (
                  <option key={gender} value={Gender[gender]}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.emergencyContact
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Only show fields for non-CampusAdmin user types */}
          {formData.type !== UserType.CampusAdmin && (
            <>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Departments <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="departmentIds"
                    multiple
                    value={formData.departmentIds}
                    onChange={handleDepartmentChange}
                    className={`w-full border ${
                      isSubmitted && formData.departmentIds.length === 0
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-2 text-sm`}
                    required
                    size="4"
                  >
                    {departments.map((department) => (
                      <option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-500">
                    Hold Ctrl/Cmd to select multiple departments
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      isSubmitted && !formData.designation
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-2 text-sm`}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      isSubmitted && !formData.employmentType
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-2 text-sm`}
                    required
                  >
                    {Object.keys(EmploymentType).map((type) => (
                      <option key={type} value={EmploymentType[type]}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      isSubmitted && !formData.qualification
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md p-2 text-sm`}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Form Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;