import React, { useState, useEffect } from 'react';
import studentService from '../../../services/studentService';

// Simple validation function (since zod and react-hook-form aren't available)
const validateForm = (data) => {
  const errors = {};
  
  if (!data.firstName || data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  if (!data.lastName || data.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email address';
  }
  if (!data.enrollmentNo || data.enrollmentNo.length < 3) {
    errors.enrollmentNo = 'Enrollment number must be at least 3 characters';
  }
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!data.programBatchId) {
    errors.programBatchId = 'Please select a program batch';
  }
  if (!data.programBatchSectionId) {
    errors.programBatchSectionId = 'Please select a section';
  }
  
  return errors;
};

export const StudentForm = ({ onBack, onSuccess, student = null }) => {
  const [programBatches, setProgramBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    enrollmentNo: '',
    password: '',
    programBatchId: '',
    programBatchSectionId: '',
    guardianName: '',
    guardianContact: '',
  });

  const isEditMode = Boolean(student);

  // Initialize form data when student prop changes
  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        enrollmentNo: student.enrollmentNo || '',
        password: '', // Don't populate password for editing
        programBatchId: student.programBatchId || '',
        programBatchSectionId: student.sectionId || '',
        guardianName: student.guardianName || '',
        guardianContact: student.guardianContact || '',
      });
    }
  }, [student]);

  // Fetch program batches
  useEffect(() => {
    const fetchProgramBatches = async () => {
      try {
        const response = await studentService.getProgramBatches();
        if (response.data && response.data.data) {
          setProgramBatches(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching program batches:', error);
      }
    };

    fetchProgramBatches();
  }, []);

  // Fetch sections when program batch changes
  useEffect(() => {
    const fetchSections = async () => {
      if (formData.programBatchId) {
        try {
          const response = await studentService.getSectionsByBatchId(formData.programBatchId);
          if (response.data && response.data.data) {
            const sectionsData = response.data.data;
            console.log('Sections data:', sectionsData);
            setFilteredSections(sectionsData);
            console.log('Sections fetched:', sectionsData);
            // If editing and the section doesn't exist in the new batch, reset it
            if (isEditMode && !sectionsData.some(section => section.id === formData.programBatchSectionId)) {
              setFormData(prev => ({ ...prev, programBatchSectionId: '' }));
            }
          }
        } catch (error) {
          console.error('Error fetching sections:', error);
          setFilteredSections([]);
        }
      } else {
        setFilteredSections([]);
        setFormData(prev => ({ ...prev, programBatchSectionId: '' }));
      }
      setIsLoading(false);
    };

    if (programBatches.length > 0) {
      fetchSections();
    }
  }, [formData.programBatchId, programBatches, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        enrollmentNo: formData.enrollmentNo,
        programBatchSectionId: Number(formData.programBatchSectionId),
        guardianName: formData.guardianName || undefined,
        guardianContact: formData.guardianContact || undefined,
      };

      // Only include password for new students
      if (!isEditMode) {
        payload.password = formData.password;
      }

      let response;
      if (isEditMode) {
        response = await studentService.updateStudent(student.id, payload);
      } else {
        response = await studentService.createStudent(payload);
      }

      console.log(`Student ${isEditMode ? 'updated' : 'created'} successfully`);
      onSuccess && onSuccess();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} student:`, error);
      
      // Handle specific error cases
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: `Failed to ${isEditMode ? 'update' : 'create'} student. Please try again.` });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && programBatches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="text-center">Loading form...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
        </h2>
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block mb-1 font-medium">First Name *</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block mb-1 font-medium">Last Name *</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Enrollment No */}
        <div>
          <label htmlFor="enrollmentNo" className="block mb-1 font-medium">Enrollment Number *</label>
          <input
            id="enrollmentNo"
            name="enrollmentNo"
            type="text"
            value={formData.enrollmentNo}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.enrollmentNo ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.enrollmentNo && (
            <p className="text-red-500 text-sm mt-1">{errors.enrollmentNo}</p>
          )}
        </div>

        {/* Password - Only show for new students */}
        {!isEditMode && (
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        )}

        {/* Program Batch Dropdown */}
        <div>
          <label htmlFor="programBatchId" className="block mb-1 font-medium">Program Batch *</label>
          <select
            id="programBatchId"
            name="programBatchId"
            value={formData.programBatchId}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.programBatchId ? 'border-red-500' : 'border-gray-300'}`}
            required
          >
            <option value="">Select a program batch</option>
            {programBatches.map((batch) => (
              <option key={batch.programBatchId} value={batch.programBatchId}>
                {batch.batchName}
              </option>
            ))}
          </select>
          {errors.programBatchId && (
            <p className="text-red-500 text-sm mt-1">{errors.programBatchId}</p>
          )}
        </div>

        {/* Section Dropdown */}
        <div>
          <label htmlFor="programBatchSectionId" className="block mb-1 font-medium">Section *</label>
          <select
            id="programBatchSectionId"
            name="programBatchSectionId"
            value={formData.programBatchSectionId}
            onChange={handleInputChange}
            disabled={!formData.programBatchId}
            className={`w-full p-2 border rounded ${errors.programBatchSectionId ? 'border-red-500' : 'border-gray-300'} ${!formData.programBatchId ? 'bg-gray-100' : ''}`}
            required
          >
            <option value="">
              {formData.programBatchId ? 'Select a section' : 'Select a program batch first'}
            </option>
            {filteredSections.map((section) => (
              <option key={section.programBatchSectionId} value={section.programBatchSectionId}>
                {section.sectionName}
              </option>
            ))}
          </select>
          {errors.programBatchSectionId && (
            <p className="text-red-500 text-sm mt-1">{errors.programBatchSectionId}</p>
          )}
        </div>

        {/* Guardian Name */}
        <div>
          <label htmlFor="guardianName" className="block mb-1 font-medium">Guardian Name</label>
          <input
            id="guardianName"
            name="guardianName"
            type="text"
            value={formData.guardianName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Guardian Contact */}
        <div>
          <label htmlFor="guardianContact" className="block mb-1 font-medium">Guardian Contact</label>
          <input
            id="guardianContact"
            name="guardianContact"
            type="text"
            value={formData.guardianContact}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {isSubmitting 
            ? (isEditMode ? 'Updating...' : 'Creating...')
            : (isEditMode ? 'Update Student' : 'Create Student')
          }
        </button>
      </div>
    </form>
  );
};

export default StudentForm;


