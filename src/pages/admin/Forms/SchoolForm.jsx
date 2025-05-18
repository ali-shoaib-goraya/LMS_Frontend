import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import schoolService from "@/services/schoolService"; // adjust path as needed

const validationSchema = Yup.object().shape({
  name: Yup.string().required("School name is required"),
});

const SchoolForm = ({ onBack, editData = null, onSaveSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      shortName: "",
      city: "",
      isAcademic: false,
      address: "",
      notes: "",
    },
  });

  // When editData changes (e.g. when modal opens for edit), prefill the form
  useEffect(() => {
    if (editData) {
      reset({
        name: editData.schoolName || "", 
        shortName: editData.shortName || "",
        city: editData.city || "",
        isAcademic: editData.isAcademic || false,
        address: editData.address || "",
        notes: editData.notes || "",
      });
    } else {
      // If adding a new school, reset to empty form
      reset();
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      if (editData?.schoolId) {
        // Edit mode
        await schoolService.updateSchool(editData.schoolId, data);
      } else {
        // Add mode
        await schoolService.createSchool(data);
      }

      if (onSaveSuccess) onSaveSuccess();
      reset(); // Clear form after submission
    } catch (error) {
      console.error("Error saving school:", error);
      // Optional: Add toast or error message
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* School Name */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm text-gray-700">School Name</label>
          <input
            type="text"
            {...register("name")}
            className={`p-2 text-lg border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Short Name, City */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <label className="text-sm text-gray-700">Short Name</label>
            <input
              type="text"
              {...register("shortName")}
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <label className="text-sm text-gray-700">City</label>
            <input
              type="text"
              {...register("city")}
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Academic Checkbox */}
        <div className="flex items-center space-x-3 mt-4">
          <input
            type="checkbox"
            {...register("isAcademic")}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label className="text-sm text-gray-700">Academic?</label>
        </div>

        {/* Address */}
        <div className="flex flex-wrap gap-5 mt-4">
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-wrap gap-5 mt-4">
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <label className="text-sm text-gray-700">Notes</label>
            <input
              type="text"
              {...register("notes")}
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editData ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              onBack();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolForm;
