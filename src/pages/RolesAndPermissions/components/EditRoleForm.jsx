import React, { useState, useEffect } from 'react';
import permissionService from '../../../services/permissionService';
import roleService from '../../../services/roleService';

function EditRoleForm({ role = {}, onSave, onCancel }) {
  // Initialize formData state with default values
  const [formData, setFormData] = useState({
    name: role.name || '',
    description: role.description || '',
    status: role.status ?? true,
    permissions: role.permissions || [],
  });

  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update formData when the role prop changes
    setFormData({
      name: role.name || '',
      description: role.description || '',
      status: role.status ?? true,
      permissions: role.permissions || [],
    });
  }, [role]);

  useEffect(() => {
    // Fetch available permissions from backend
    const fetchPermissions = async () => {
      try {
        const response = await permissionService.getAllPermissions();
        setAvailablePermissions(response.data || []);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setAvailablePermissions([]);
      }
    };
    fetchPermissions();
  }, []);

  const handlePermissionChange = (permissionName) => {
    const updatedPermissions = formData.permissions.includes(permissionName)
      ? formData.permissions.filter((p) => p !== permissionName)
      : [...formData.permissions, permissionName];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
        permissions: formData.permissions,
      };

      await roleService.updateRole(role.id, submitData);
      onSave(submitData);
    } catch (error) {
      console.error('Error updating role:', error);
      setErrors({ submit: 'Failed to update role. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full border rounded-md p-2 mt-1 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full border rounded-md p-2 mt-1 border-gray-300"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Permissions</label>
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {availablePermissions.length > 0 ? (
              availablePermissions.map((permission) => (
                <div key={permission.id || permission.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission.name}
                    checked={formData.permissions.includes(permission.name)}
                    onChange={() => handlePermissionChange(permission.name)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    disabled={loading}
                  />
                  <label htmlFor={permission.name} className="ml-2 text-sm text-gray-700">
                    {permission.name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No permissions available.</p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="status" className="ml-2 text-sm text-gray-700">
            Active Role
          </label>
        </div>

        {errors.submit && (
          <div className="text-red-600 text-sm">{errors.submit}</div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRoleForm;