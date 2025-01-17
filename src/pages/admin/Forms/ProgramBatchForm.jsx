import React, { useState } from "react";

const ProgramForm = () => {
  const [formData, setFormData] = useState({
    program: "",
    academicYear: "",
    sections: "",
    programBatch: "",
    noOfSessions: "",
    ploPassingThreshhold: "",
    status: "",
    useInObe: "",
    marks: "",
    students: "",
    theoryCreditHours: "",
    labCreditHours: "",
    Curriculum: "",
    gpaPolicy: "",
    freshmanAndSophomoreYearSemesters: "",
    juniorandseniorYearSemesters: "",
    freshmanAndSophomoreYearWeight: "",
    juniorandseniorYearWeight: "",
    indirectAssessmentPercentage: ""
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
      "program",
      "academicYear",
      "sections",
      "programBatch",
      "noOfSessions",
      "ploPassingThreshhold",
      "status",
      "useInObe",
      "marks",
      "students",
      "theoryCreditHours",
      "labCreditHours",
      "Curriculum",
      "gpaPolicy",
      "freshmanAndSophomoreYearSemesters",
      "juniorandseniorYearSemesters",
      "freshmanAndSophomoreYearWeight",
      "juniorandseniorYearWeight",
      "indirectAssessmentPercentage",
    ];
    return requiredFields.every((field) => formData[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      alert("Form submitted successfully!");
      // Reset form state
      setFormData({
        program: "",
        academicYear: "",
        sections: "",
        programBatch: "",
        noOfSessions: "",
        ploPassingThreshhold: "",
        status: "",
        useInObe: "",
        marks: "",
        students: "",
        theoryCreditHours: "",
        labCreditHours: "",
        Curriculum: "",
        gpaPolicy: "",
        freshmanAndSophomoreYearSemesters: "",
        juniorandseniorYearSemesters: "",
        freshmanAndSophomoreYearWeight: "",
        juniorandseniorYearWeight: "",
        indirectAssessmentPercentage: "",
      });
      setIsSubmitted(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      {/* Title Section */}
      <div className="mb-8 border-b-2 pb-4">
        <h2 className="text-2xl text-gray-800">Create Program Batch</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white border border-gray-300 rounded-md p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Program
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.program ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="Math">Mathematics</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Academic Year
              </label>
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.academicYear ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm text-gray-600 mb-2">
                Sections
              </label>
              <input
                type="text"
                name="sections"
                placeholder="A, B, C"
                value={formData.sections}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.sections ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Program Batch
              </label>
              <input
                name="programBatch"
                type="text"
                value={formData.programBatch}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.programBatch ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                No. of Sessions
              </label>
              <input
                type="number"
                name="noOfSessions"
                placeholder="8"
                value={formData.noOfSessions}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.noOfSessions ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm text-gray-600 mb-2">
                PLO Passing Threshhold
              </label>
              <input
                type="number"
                name="ploPassingThreshhold"
                placeholder="50"
                value={formData.ploPassingThreshhold}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.ploPassingThreshhold ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Third Row */}
          {/* Row for Status, Use in OBE, Marks, Students, Theory Credit Hours, Lab Credit Hours */}
          <div className="flex flex-wrap -mx-2 mb-4">
            {/* Status */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <input
                name="status"
                type="text"
                placeholder="Active"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.status ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

            {/* Use in OBE */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Use in OBE</label>
              <input
                name="useInObe"
                placeholder="Yes"
                value={formData.useInObe}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.useInObe ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
              </input>
            </div>

            {/* Marks */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Marks %</label>
              <input
                type="number"
                name="marks"
                placeholder="70"
                value={formData.marks}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.marks ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

            {/* Students */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Students %</label>
              <input
                type="number"
                name="students"
                placeholder="80"
                value={formData.students}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.students ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

            {/* Theory Credit Hours */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Theory Credit Hours</label>
              <input
                type="number"
                name="theoryCreditHours"
                value={formData.theoryCreditHours}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.theoryCreditHours
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>

            {/* Lab Credit Hours */}
            <div className="w-full md:w-1/6 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">Lab Credit Hours</label>
              <input
                type="number"
                name="labCreditHours"
                value={formData.labCreditHours}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.labCreditHours
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
              <label className="block text-sm text-gray-600 mb-2">
                Curriculum
              </label>
              <select
                name="Curriculum"
                value={formData.Curriculum}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.Curriculum ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="Math">Mathematics</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="w-full md:w-2/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                GPA Policy
              </label>
              <select
                name="gpaPolicy"
                value={formData.gpaPolicy}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.gpaPolicy ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              >
                <option value="">- Select -</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>

          {/* Fifth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Freshman and Sophomore Year Semesters
              </label>
              <input
                name="freshmanAndSophomoreYearSemesters"
                type="number"
                placeholder="1,2,3,4"
                value={formData.freshmanAndSophomoreYearSemesters}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.freshmanAndSophomoreYearSemesters ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Junior and Senior Year Semesters
              </label>
              <input
                type="number"
                name="juniorandseniorYearSemesters"
                placeholder="5,6,7,8"
                value={formData.juniorandseniorYearSemesters}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.juniorandseniorYearSemesters ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm text-gray-600 mb-2">
                Freshman and Sophomore Year Weight
              </label>
              <input
                type="number"
                name="freshmanAndSophomoreYearWeight"
                placeholder="40"
                value={formData.freshmanAndSophomoreYearWeight}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.freshmanAndSophomoreYearWeight ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2">
              <label className="block text-sm text-gray-600 mb-2">
                Junior and Senior Year Weight
              </label>
              <input
                type="number"
                name="juniorandseniorYearWeight"
                placeholder="60"
                value={formData.juniorandseniorYearWeight}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.juniorandseniorYearWeight ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
          </div>

          {/* Sixth Row */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <label className="block text-sm text-gray-600 mb-2">
                Indirect Assessment Percentage
              </label>
              <input
                type="number"
                name="indirectAssessmentPercentage"
                placeholder="0"
                value={formData.indirectAssessmentPercentage}
                onChange={handleInputChange}
                className={`w-full border ${
                  isSubmitted && !formData.indirectAssessmentPercentage
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 text-sm`}
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0 flex items-center">
              <input
                type="checkbox"
                id="indirectAssessmentCheckbox"
                name="indirectAssessmentCheckbox"
                checked={formData.indirectAssessmentCheckbox}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600" htmlFor="indirectAssessmentCheckbox">
                Include Indirect Assessment on Student Portal
              </label>
            </div>
          </div>


          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramForm;
