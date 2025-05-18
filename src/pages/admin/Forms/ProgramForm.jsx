import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import programService from "../../../services/programService";
import { toast } from "react-toastify";

// Validation schema
const schema = yup.object().shape({
  programName: yup.string().required("Program name is required"),
  code: yup.string().required("Code is required"),
  degreeType: yup.string().required("Degree type is required"),
  creditRequired: yup
    .number()
    .typeError("Credit must be a number")
    .required("Credit is required")
    .min(0, "Credit must be positive"),
  departmentId: yup.number().required("Department is required"),
  description: yup.string().nullable(),
  duration: yup.string().nullable(),
});

const ProgramForm = ({ onBack, program, onSubmitSuccess }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = program !== null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      programName: "",
      code: "",
      degreeType: "",
      creditRequired: "",
      departmentId: "",
      description: "",
      duration: "",
    },
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Set form values if editing
  useEffect(() => {
    if (program) {
      setValue("programName", program.programName);
      setValue("code", program.code);
      setValue("degreeType", program.degreeType);
      setValue("creditRequired", program.creditRequired);
      setValue("departmentId", program.departmentId);
      setValue("description", program.description);
      setValue("duration", program.duration);
    }
  }, [program, setValue]);

  // Fetch departments for dropdown
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await programService.getDepartments();
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      toast.error("Failed to load departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      
      if (isEditMode) {
        // Update existing program
        await programService.updateProgram(program.programId, data);
        onSubmitSuccess(true); // Pass true to indicate update
      } else {
        // Create new program
        await programService.createProgram(data);
        onSubmitSuccess(false); // Pass false to indicate create
      }
      
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(isEditMode ? "Failed to update program" : "Failed to create program");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit Program" : "Create New Program"}
      </h2>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Program Name" 
              name="programName" 
              register={register} 
              error={errors.programName} 
            />
            
            <InputField 
              label="Code" 
              name="code" 
              register={register} 
              error={errors.code} 
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree Type
              </label>
              <select
                {...register("degreeType")}
                className={`w-full border ${
                  errors.degreeType ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
              >
                <option value="">- Select Degree Type -</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Doctorate">Doctorate</option>
              </select>
              {errors.degreeType && (
                <p className="text-red-500 text-xs mt-1">{errors.degreeType.message}</p>
              )}
            </div>

            <InputField
              label="Credit Required"
              name="creditRequired"
              type="number"
              register={register}
              error={errors.creditRequired}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                {...register("departmentId")}
                className={`w-full border ${
                  errors.departmentId ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-sm`}
              >
                <option value="">- Select Department -</option>
                {departments.map((department) => (
                  <option 
                    key={department.departmentId} 
                    value={department.departmentId}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-red-500 text-xs mt-1">{errors.departmentId.message}</p>
              )}
            </div>
            
            <InputField 
              label="Duration (e.g., 4 years)" 
              name="duration" 
              register={register} 
              error={errors.duration} 
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="4"
              className={`w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 text-sm`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {submitting ? (
                "Processing..."
              ) : isEditMode ? (
                "Update Program"
              ) : (
                "Create Program"
              )}
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
      )}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, register, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...register(name)}
      type={type}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md p-2 text-sm`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default ProgramForm;