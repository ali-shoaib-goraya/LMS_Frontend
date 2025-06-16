import React, { useState, useEffect } from 'react';
import permissionService from '../../../services/permissionService';

const RoleForm = ({ initialData, onSubmit, onCancel, RoleNames }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status ?? true,
  });

  const [selectedPermissions, setSelectedPermissions] = useState(
    new Set(initialData?.permissions || [])
  );
  const [allPermissions, setAllPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch permissions from backend
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await permissionService.getAllPermissions();
        setAllPermissions(response.data || []);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setAllPermissions([]);
      }
    };
    fetchPermissions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePermissionToggle = (permissionName) => {
    setSelectedPermissions((prev) => {
      const updated = new Set(prev);
      if (updated.has(permissionName)) {
        updated.delete(permissionName);
      } else {
        updated.add(permissionName);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Role name is required.' }));
      setLoading(false);
      return;
    }

    if (RoleNames.includes(formData.name.trim())) {
      setErrors((prev) => ({
        ...prev,
        name: 'Role name already exists. Please choose a different name.',
      }));
      setLoading(false);
      return;
    }

    // Prepare data in backend expected format
    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      permissions: Array.from(selectedPermissions),
    };

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to save role. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-0 focus:border-blue-500 focus:bg-white"
            disabled={loading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Permissions (Optional)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {allPermissions.map((permission) => (
              <div key={permission.id || permission.name} className="flex items-center">
                <input
                  type="checkbox"
                  id={`permission-${permission.id || permission.name}`}
                  checked={selectedPermissions.has(permission.name)}
                  onChange={() => handlePermissionToggle(permission.name)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={loading}
                />
                <label
                  htmlFor={`permission-${permission.id || permission.name}`}
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled={loading}
          />
          <label
            htmlFor="status"
            className="ml-2 block text-sm text-gray-700"
          >
            Active Role
          </label>
        </div>

        {errors.submit && (
          <div className="text-red-600 text-sm">{errors.submit}</div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : (initialData ? 'Update Role' : 'Create Role')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;