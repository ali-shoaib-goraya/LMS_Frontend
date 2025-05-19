import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import semesterService from "../../../services/semesterService";

const SemesterForm = ({ semesterData, onBack, onSubmitSuccess }) => {
  // Status enum
  const STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive"
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: semesterData?.name || "",
      startDate: semesterData?.startDate || "",
      endDate: semesterData?.endDate || "",
      status: semesterData?.status || "",
      notes: semesterData?.notes || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
      status: Yup.string()
        .oneOf([STATUS.ACTIVE, STATUS.INACTIVE], "Invalid status")
        .required("Status is required"),
      notes: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (semesterData) {
          // Update existing semester
          await semesterService.updateSemester(semesterData.id, {
            semesterName: values.name,
            status: values.status,
            startDate: values.startDate,
            endDate: values.endDate,
            notes: values.notes
          });
        } else {
          // Create new semester
          await semesterService.createSemester({
            semesterName: values.name,
            status: values.status,
            startDate: values.startDate,
            endDate: values.endDate,
            notes: values.notes
          });
        }
        
        if (onSubmitSuccess) {
          onSubmitSuccess();
        } else {
          onBack(); // Fallback to just going back if no success handler
        }
      } catch (error) {
        console.error("Error submitting semester:", error);
        alert(`Failed to ${semesterData ? 'update' : 'create'} semester. Please try again.`);
      }
    },
  });

  // Update form values when semesterData changes
  useEffect(() => {
    if (semesterData) {
      formik.setValues({
        name: semesterData.name || "",
        startDate: semesterData.startDate || "",
        endDate: semesterData.endDate || "",
        status: semesterData.status || "",
        notes: semesterData.notes || "",
      });
    } else {
      formik.resetForm();
    }
  }, [semesterData]);

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {semesterData ? "Edit Semester" : "Add New Semester"}
      </h2>
      
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="grid grid-cols-1 gap-5 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter semester name"
              className={`p-2 text-lg border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`p-2 text-lg border ${
                formik.touched.startDate && formik.errors.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className="text-red-500 text-sm">
                {formik.errors.startDate}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">End Date*</label>
            <input
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`p-2 text-lg border ${
                formik.touched.endDate && formik.errors.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
            ) : null}
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 gap-5 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Status*</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`p-2 text-lg border ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="">Select Status</option>
              <option value={STATUS.ACTIVE}>{STATUS.ACTIVE}</option>
              <option value={STATUS.INACTIVE}>{STATUS.INACTIVE}</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-500 text-sm">{formik.errors.status}</div>
            ) : null}
          </div>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 gap-5 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="3"
              placeholder="Add optional notes"
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : semesterData ? "Update" : "Submit"}
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
  );
};

export default SemesterForm;