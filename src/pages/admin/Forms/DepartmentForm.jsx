  import React, { useState } from "react";

  const DepartmentForm = () => {
    const [formData, setFormData] = useState({
      departmentName: "",
      shortName: "",
      school: "",
      type: "",
      defaultGpaMethod: "",
      attendancePercentage: "",
      allowAttendanceDays: "",
      lockActivityDays: "",
      assessmetntMethods:"",
      isActive: false,
      allowFaculty: false,
      allowedGpaMethods: "",
      clearingProcesses: "",
      complaintPersons: "",
      vision: "",
      signatorySignature: null,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : files ? files[0] : value,
      }));
    };

    const validateForm = () => {
      const requiredFields = [
        "departmentName",
        "shortName",
        "school",
        "type",
        "defaultGpaMethod",
        "attendancePercentage",
        "allowAttendanceDays",
        "lockActivityDays",
        "assessmetntMethods",
        "allowedGpaMethods",
        "clearingProcesses",
        "complaintPersons",
        "vision",
        "signatorySignature", // Add the file field here
      ];
      let isValid = true;
    
      requiredFields.forEach((field) => {
        if (
          !formData[field] || 
          (typeof formData[field] === "string" && formData[field].trim() === "") ||
          (field === "signatorySignature" && !formData[field]) // Check if a file is selected
        ) {
          isValid = false;
        }
      });
    
      return isValid;
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true); // Mark the form as submitted
    
      // Validate the form fields
      if (validateForm()) {
        alert("Form submitted successfully!");
    
        // Reset the form data
        setFormData({
          departmentName: "",
          shortName: "",
          school: "",
          type: "",
          defaultGpaMethod: "",
          attendancePercentage: "",
          allowAttendanceDays: "",
          lockActivityDays: "",
          assessmetntMethods: "",
          isActive: false,
          allowFaculty: false,
          allowedGpaMethods: "",
          clearingProcesses: "",
          complaintPersons: "",
          vision: "",
          signatorySignature: null, // Ensure the file input is reset
        });
    
        // Reset the form submission state
        setIsSubmitted(false);
    
        // Manually clear the file input (required for file upload inputs)
        const fileInput = e.target.querySelector("input[type='file']");
        if (fileInput) {
          fileInput.value = null; // Reset the file input value
        }
      } else {
        alert("Please fill in all required fields.");
      }
    };
    
    return (
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Department Name</label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.departmentName ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500   ${
                  isSubmitted && !formData.shortName ? "border-red-500" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">School</label>
              <input
                type="text"
                name="school"
                placeholder="Faculty of Computer Science"
                value={formData.school}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.school ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                name="type"
                placeholder="Academic Department"
                value={formData.type}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.type ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Default GPA Method</label>
              <input
                type="text"
                name="defaultGpaMethod"
                placeholder="Absolute"
                value={formData.defaultGpaMethod}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.defaultGpaMethod ? "border-red-500" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Attendance %</label>
              <input
                type="text"
                name="attendancePercentage"
                placeholder="75%"
                value={formData.attendancePercentage}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.attendancePercentage ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Allow Attendance After Days</label>
              <input
                type="text"
                name="allowAttendanceDays"
                placeholder="0"
                value={formData.allowAttendanceDays}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.allowAttendanceDays ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lock Activity Days</label>
              <input
                type="text"
                name="lockActivityDays"
                placeholder="0"
                value={formData.lockActivityDays}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  isSubmitted && !formData.lockActivityDays ? "border-red-500" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assessmetnt Methods</label>
              <input
                type="text"
                name="assessmetntMethods"
                placeholder="Washington Accord"
                value={formData.assessmetntMethods}
                onChange={handleChange}
                className={`mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  isSubmitted && !formData.assessmetntMethods ? "border-red-500" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Checkbox Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="allowFaculty"
                checked={formData.allowFaculty}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm text-gray-700">Allow Faculty to add CLO from Course Section</label>
            </div>
          </div>

          {/* Textarea Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Allowed GPA Methods</label>
            <textarea
              name="allowedGpaMethods"
              value={formData.allowedGpaMethods}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                isSubmitted && !formData.allowedGpaMethods ? "border-red-500" : "border-gray-300"
              }`}
              rows="1"
              required
            ></textarea>
          </div>

          {/* Additional fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Clearing Processes</label>
            <textarea
              name="clearingProcesses"
              value={formData.clearingProcesses}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                isSubmitted && !formData.clearingProcesses ? "border-red-500" : "border-gray-300"
              }`}
              rows="1"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Complaint Persons</label>
            <textarea
              name="complaintPersons"
              value={formData.complaintPersons}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                isSubmitted && !formData.complaintPersons ? "border-red-500" : "border-gray-300"
              }`}
              rows="1"
              required
            ></textarea>
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Signatory Signature</label>
              <input
                type="file"
                name="signatorySignature"
                onChange={handleChange}
                className={`mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  isSubmitted && !formData.signatorySignature ? "border-red-500" : ""
                }`}
                required
              />
            </div>
          </div>

          
          {/* Vision Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vision</label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                isSubmitted && !formData.vision ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
              required
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="col-span-12 text-left">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600"
              >
                Save
              </button>
            </div>
        </form>
      </div>
    );
  };

  export default DepartmentForm;
