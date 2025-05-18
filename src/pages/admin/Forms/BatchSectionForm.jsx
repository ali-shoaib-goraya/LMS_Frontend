import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Updated validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortName: yup.string().max(10, "Short Name should be at most 10 characters"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .positive("Capacity must be positive")
    .integer("Capacity must be an integer"),
});

const BatchSectionForm = ({ onBack, initialData, onSubmitData }) => {
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
      capacity: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        shortName: initialData.shortName || "",
        capacity: initialData.capacity || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onSubmitData(data);
  };

  const getInputStyle = (field) =>
    `mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Batch Section" : "Add New Batch Section"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Row with Name and Short Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className={getInputStyle("name")}
              />
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">
                Short Name
              </label>
              <input
                id="shortName"
                {...register("shortName")}
                className={getInputStyle("shortName")}
              />
              <p className="text-red-600 text-sm">{errors.shortName?.message}</p>
            </div>
          </div>

          {/* Capacity Field */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              {...register("capacity")}
              className={getInputStyle("capacity")}
            />
            <p className="text-red-600 text-sm">{errors.capacity?.message}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition"
            >
              {initialData ? "Update" : "Submit"}
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

export default BatchSectionForm;
