import React, { useState, useEffect } from 'react';
import studentService from '../../../services/studentService';

export const BulkStudentsForm = ({ onBack, onSuccess }) => {
  const [programBatches, setProgramBatches] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    programBatchId: '',
    programBatchSectionId: '',
    file: null
  });

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
      } finally {
        setIsLoading(false);
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
            setFilteredSections(sectionsData);
          }
        } catch (error) {
          console.error('Error fetching sections:', error);
          setFilteredSections([]);
        }
      } else {
        setFilteredSections([]);
        setFormData(prev => ({ ...prev, programBatchSectionId: '' }));
      }
    };

    if (programBatches.length > 0) {
      fetchSections();
    }
  }, [formData.programBatchId, programBatches]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      
      // Clear error when user selects a file
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.programBatchId) {
      newErrors.programBatchId = 'Please select a program batch';
    }
    
    if (!formData.programBatchSectionId) {
      newErrors.programBatchSectionId = 'Please select a section';
    }
    
    if (!formData.file) {
      newErrors.file = 'Please upload a CSV file';
    } else if (!formData.file.name.toLowerCase().endsWith('.csv')) {
      newErrors.file = 'Please upload a valid CSV file';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Create FormData object to send file
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('file', formData.file);
      formDataToSubmit.append('programBatchSectionId', formData.programBatchSectionId);
      
      // Add your API call here
      // For example:
      // await studentService.uploadBulkStudents(formDataToSubmit);
      
      // Mock successful upload for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Students uploaded successfully');
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error uploading students:', error);
      
      // Handle specific error cases
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to upload students. Please try again.' });
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
        <h2 className="text-2xl font-semibold text-gray-800">Add Students in Bulk</h2>
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <div className="space-y-6">
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

        {/* CSV File Upload */}
        <div>
          <label htmlFor="file" className="block mb-1 font-medium">CSV File *</label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className={`w-full p-2 border rounded ${errors.file ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Upload a CSV file containing student data
          </p>
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
          {isSubmitting ? 'Uploading...' : 'Upload Students'}
        </button>
      </div>
    </form>
  );
};

export default BulkStudentsForm;