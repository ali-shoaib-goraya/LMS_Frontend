import React, { useState } from "react";

const CampusForm = () => {
  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark the form as submitted

    // Check if all required fields are filled. If not, don't submit.
    const formElements = e.target.elements;
    let isFormValid = true;

    for (let element of formElements) {
      if (element.required && !element.value) {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid) {
      // Here you would handle the form submission (e.g., API call)
      console.log("Form submitted successfully!");

      // Reset the form fields after successful submission
      e.target.reset();
      setIsSubmitted(false); // Reset the submission state
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200 landscape">
      {/* Title Section with Border Below */}
      <div className="mb-8 border-b-2 pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Create Your Form</h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name, Short Name, Type, and City Row */}
          <div className="flex gap-6">
            <div className="w-2/5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("name").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div className="w-1/5">
              <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">
                Short Name
              </label>
              <input
                type="text"
                id="shortName"
                name="shortName"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("shortName").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div className="w-1/5">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                placeholder="Main Campus"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("type").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div className="w-1/5">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("city").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>
          </div>

          {/* Textareas for Address and Notes */}
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="1"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("address").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="2"
                className={`mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !document.getElementById("notes").value ? 'border-red-500' : 'border-gray-300'}`}
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampusForm;
