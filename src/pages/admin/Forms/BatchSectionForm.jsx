import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import sectionService from "../../../services/sectionService"; // Adjust the import path as needed

const schema = yup.object().shape({
  sectionName: yup.string().required("Section name is required"),
  programBatchId: yup.string().required("Program Batch is required"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .positive("Capacity must be positive")
    .integer("Capacity must be an integer"),
});

const BatchSectionForm = ({ onBack, initialData, onSubmitData }) => {
  const [programBatches, setProgramBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sectionName: "",
      programBatchId: "",
      capacity: "",
    },
  });

  // Fetch program batches when component mounts
  useEffect(() => {
    const fetchProgramBatches = async () => {
      try {
        setIsLoading(true);
        const response = await sectionService.getAllProgramBatches();
        setProgramBatches(response.data.data || []);
      } catch (error) {
        console.error("Error fetching program batches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramBatches();
  }, []);

  // Reset form values only when both initialData and programBatches are ready
  useEffect(() => {
    if (initialData && programBatches.length > 0) {
      reset({
        sectionName: initialData.sectionName || "",
        programBatchId: initialData.programBatchId || "",
        capacity: initialData.capacity || "",
      });
    }
  }, [initialData, programBatches, reset]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        sectionName: data.sectionName,
        programBatchId: data.programBatchId,
        capacity: parseInt(data.capacity),
      };

      if (initialData) {
        await sectionService.updateSection(initialData.programBatchSectionId, payload);
      } else {
        await sectionService.createSection(payload);
      }

      onSubmitData(data);
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Failed to save section. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          {/* Row with Name and Program Batch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700">
                Section Name
              </label>
              <input
                id="sectionName"
                {...register("sectionName")}
                className={getInputStyle("sectionName")}
              />
              <p className="text-red-600 text-sm">{errors.sectionName?.message}</p>
            </div>

            <div>
              <label htmlFor="programBatchId" className="block text-sm font-medium text-gray-700">
                Program Batch
              </label>
              <select
                id="programBatchId"
                {...register("programBatchId")}
                className={getInputStyle("programBatchId")}
                disabled={isLoading}
              >
                <option value="">Select Program Batch</option>
                {programBatches.map((batch) => (
                  <option key={batch.programBatchId} value={batch.programBatchId}>
                    {batch.batchName}
                  </option>
                ))}
              </select>
              <p className="text-red-600 text-sm">{errors.programBatchId?.message}</p>
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
              disabled={isLoading}
              className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition disabled:bg-green-400"
            >
              {isLoading ? "Processing..." : initialData ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200"
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
