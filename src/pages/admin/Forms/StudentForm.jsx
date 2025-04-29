import React, { useState } from "react";
import { mockBatches } from "../../../MockData/mockBatches";

const StudentForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    section: "",
    role: "",
    school: "",
    programBatch: "",
    gender: "",
    cnic: "",
    dateOfBirth: "",
    MobileNo: "",
    department: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "section",
      "role",
      "school",
      "programBatch",
      "cnic",
      "dateOfBirth",
      "MobileNo",
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
        section: "",
        role: "",
        school: "",
        programBatch: "",
        gender: "",
        cnic: "",
        dateOfBirth: "",
        MobileNo: "",
        department: "",
      });
      setIsSubmitted(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <div className="bg-white border border-gray-300 rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit}>

          {/* First Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.email ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                placeholder="example@domain.com"
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Section</label>
              <input
                type="text"
                name="section"
                placeholder="A,B,C"
                value={formData.section}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.section ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Program Batch</label>
              <select
                name="programBatch"
                value={formData.programBatch}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.programBatch ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">Select Program Batch</option>
                {mockBatches.map((batch, idx) => (
                  <option key={idx} value={batch.programBatch}>
                    {batch.programBatch}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.school ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                placeholder="All Schools"
                required
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.gender ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">CNIC</label>
              <input
                type="number"
                name="cnic"
                placeholder="xxxxx-xxxxxxx-x"
                value={formData.cnic}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.cnic ? "border-red-500" : "border-gray-300"
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
                  isSubmitted && !formData.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Mobile No</label>
              <input
                type="number"
                name="MobileNo"
                placeholder="03XXXXXXXXX"
                value={formData.MobileNo}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.MobileNo ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Department */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.department ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Submit
            </button>
            <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentForm;
