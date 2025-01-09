import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    school: "",
    status: "",
    type: "",
    designation: "",
    gender: "",
    highestDegree: "",
    facultyType: "",
    cnic: "",
    dateOfBirth: "",
    joiningDate: "",
    leavingDate: "",
    workMobile: "",
    alternativeMobile: "",
    workPhone: "",
    department: "",
    otherdepartment:"",
    isPhD: false, // Checkbox state
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "role",
      "school",
      "status",
      "type",
      "cnic",
      "dateOfBirth",
      "joiningDate",
      "workMobile",
    ];
    return requiredFields.every((field) => formData[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        school: "",
        status: "",
        type: "",
        designation: "",
        gender: "",
        highestDegree: "",
        facultyType: "",
        cnic: "",
        dateOfBirth: "",
        joiningDate: "",
        leavingDate: "",
        workMobile: "",
        alternativeMobile: "",
        workPhone: "",
        department: "",
        otherdepartment:"",
        isPhD: false,
      });
      setIsSubmitted(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-gray-300 rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit}>

          {/* First Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name
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
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.middleName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name
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
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
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


          {/* Second Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="text"
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
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                placeholder="Departmet Admin"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.role
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                School
              </label>
              <input
                type="text"
                name="school"
                placeholder="All Schools"
                value={formData.school}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.school
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>
          
          {/* Third Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Status
              </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.status
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Type
              </label>
              <input
                type="text"
                name="type"
                placeholder="Teacher"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.type
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Designation
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
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.gender
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Highest Degree
              </label>
              <input
                type="text"
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.highestDegree
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Faculty Type
              </label>
              <input
                type="text"
                name="facultyType"
                placeholder="Full Time Regular Faculty"
                value={formData.facultyType}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.facultyType
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                CNIC
              </label>
              <input
                type="number"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.cnic
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.dateOfBirth
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.joiningDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required

              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Leaving Date</label>
              <input
                type="date"
                name="leavingDate"
                value={formData.leavingDate}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.leavingDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required

              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Work Mobile</label>
              <input
                type="number"
                name="workMobile"
                value={formData.workMobile}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.workMobile
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Alternative Mobile</label>
              <input
                type="number"
                name="alternativeMobile"
                value={formData.alternativeMobile}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.alternativeMobile
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Sixth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Work Phone</label>
              <input
                type="number"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.workPhone
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required

              />
            </div>
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Departments</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.department
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Seventh Row */}
          <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Other Department</label>
              <input
                type="text"
                name="otherdepartment"
                value={formData.otherdepartment}
                onChange={handleInputChange}
                className={`w-full borotherder ${
                  isSubmitted && !formData.otherdepartment
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

          {/* Checkbox and Save */}
          <div className="flex flex-col items-start mt-6 justify-start">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isPhD"
                checked={formData.isPhD}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">Is PhD?</label>
            </div>

            <div className="text-left">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;