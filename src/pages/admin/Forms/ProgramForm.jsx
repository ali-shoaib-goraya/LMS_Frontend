import React, { useState } from "react";

const ProgramForm = ({onBack}) => {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    sessionType: "",
    department: "",
    programlevel: "",
    noOfSessions: "",
    programType: "",
    marks: "",
    students: "",
    assessmentMethod: "",
    learningTypeCategory: "",
    vision: "",
    mission: "",
    admissionCriteriaInfo: "",
    passingCriteriaInfo: "",
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
      "name",
      "shortName",
      "sessionType",
      "department",
      "programlevel",
      "noOfSessions",
      "programType",
      "marks",
      "students",
      "assessmentMethod",
      "learningTypeCategory",
      "vision",
      "mission",
      "admissionCriteriaInfo",
      "passingCriteriaInfo",
    ];
    return requiredFields.every((field) => formData[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        shortName: "",
        sessionType: "",
        department: "",
        programlevel: "",
        noOfSessions: "",
        programType: "",
        marks: "",
        students: "",
        assessmentMethod: "",
        learningTypeCategory: "",
        vision: "",
        mission: "",
        admissionCriteriaInfo: "",
        passingCriteriaInfo: "",
      });
      setIsSubmitted(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
<div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      {/* First Row */}
      <div className="bg-white border border-gray-300 rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Short Name
              </label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.shortName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Session Type
              </label>
              <input
                type="text"
                name="sessionType"
                placeholder="Semester"
                value={formData.sessionType}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.sessionType
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-3/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.department
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="Math">Mathematics</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Program Level
              </label>
              <select
                name="programlevel"
                value={formData.programlevel}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.programlevel
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="Beginning">Beginning</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>
          </div>

          {/* Third Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                No. of Sessions
              </label>
              <input
                type="number"
                name="noOfSessions"
                placeholder="2"
                value={formData.noOfSessions}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.noOfSessions
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Program Type
              </label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.programType
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="Mid">Mid</option>
                <option value="Final">Final</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Marks %
              </label>
              <input
                type="number"
                name="marks"
                placeholder="50"
                value={formData.marks}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.marks
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Students %
              </label>
              <input
                type="number"
                name="students"
                placeholder="50"
                value={formData.students}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.students
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Assessment Method
              </label>
              <input
                type="text"
                name="assessmentMethod"
                placeholder="None"
                value={formData.assessmentMethod}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.assessmentMethod
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Learning Type Category
              </label>
              <input
                type="text"
                name="learningTypeCategory"
                placeholder="Blooms Taxonomy vol.1"
                value={formData.learningTypeCategory}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.learningTypeCategory
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/2 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Vision
              </label>
              <input
                type="text"
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.vision
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-2/2 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Mission
              </label>
              <input
                type="text"
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.mission
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Sixth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Admission Criteria Info
              </label>
              <input
                type="text"
                name="admissionCriteriaInfo"
                value={formData.admissionCriteriaInfo}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.admissionCriteriaInfo
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Passing Criteria Info
              </label>
              <input
                type="text"
                name="passingCriteriaInfo"
                value={formData.passingCriteriaInfo}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.passingCriteriaInfo
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>



          {/* Buttons */}
          <div className="flex gap-4">
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

export default ProgramForm;
