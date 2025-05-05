import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import campusService from "../../../services/campusService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortName: yup.string().max(10, "Short Name should be at most 10 characters"),
  type: yup
    .string()
    .oneOf(["MainCampus", "SubCampus"], "Type must be MainCampus or SubCampus")
    .required("Type is required"),
  city: yup.string().max(50, "City should be at most 50 characters"),
  address: yup.string().max(255, "Address should be at most 255 characters"),
  notes: yup.string().max(500, "Notes should be at most 500 characters"),
});

const CampusForm = ({ onBack, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      shortName: "",
      type: "",
      city: "",
      address: "",
      notes: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        shortName: initialData.shortName || "",
        type: initialData.type || "",
        city: initialData.city || "",
        address: initialData.address || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (initialData?.campusId) {
        // Make sure we have a valid ID for updating
        await campusService.updateCampus(initialData.campusId, data); 
        toast.success("Campus updated successfully!");
      } else {
        await campusService.createCampus(data);
        toast.success("Campus created successfully!");
      }
      setTimeout(onBack, 1500); // Navigate back after showing the toast
    } catch (error) {
      console.error("Error submitting campus:", error);
      // Extract message
      const message = error?.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (field) =>
    `mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <ToastContainer position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Campus" : "Add New Campus"}
        </h2>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-6">
            <div className="w-full sm:w-2/5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                id="name" 
                {...register("name")} 
                className={getInputStyle("name")} 
              />
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            </div>

            <div className="w-full sm:w-1/5">
              <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">Short Name</label>
              <input 
                id="shortName" 
                {...register("shortName")} 
                className={getInputStyle("shortName")} 
              />
              <p className="text-red-600 text-sm">{errors.shortName?.message}</p>
            </div>

            <div className="w-full sm:w-1/5">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select 
                id="type" 
                {...register("type")} 
                className={getInputStyle("type")}
              >
                <option value="">Select Type</option>
                <option value="MainCampus">Main Campus</option>
                <option value="SubCampus">Sub Campus</option>
              </select>
              <p className="text-red-600 text-sm">{errors.type?.message}</p>
            </div>

            <div className="w-full sm:w-1/5">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input 
                id="city" 
                {...register("city")} 
                className={getInputStyle("city")} 
              />
              <p className="text-red-600 text-sm">{errors.city?.message}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea 
                id="address" 
                rows="3" 
                {...register("address")} 
                className={getInputStyle("address")} 
              />
              <p className="text-red-600 text-sm">{errors.address?.message}</p>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea 
                id="notes" 
                rows="3" 
                {...register("notes")} 
                className={getInputStyle("notes")} 
              />
              <p className="text-red-600 text-sm">{errors.notes?.message}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : initialData ? "Update" : "Submit"}
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

export default CampusForm;