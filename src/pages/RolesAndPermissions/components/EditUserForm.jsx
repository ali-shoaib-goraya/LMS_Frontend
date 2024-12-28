import React, { useState } from 'react';

function EditUserForm({ user, availableRoles, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});

  const handleRoleChange = (role) => {
    const updatedRoles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];
    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    // Validate Roles
    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full border rounded-md p-2 mt-1 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full border rounded-md p-2 mt-1 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Roles</label>
          <div className="mt-2 space-y-2">
            {availableRoles.map((role) => (
              <div key={role} className="flex items-center">
                <input
                  type="checkbox"
                  id={role}
                  checked={formData.roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={role} className="ml-2 text-sm text-gray-700">
                  {role}
                </label>
              </div>
            ))}
          </div>
          {errors.roles && <p className="mt-1 text-sm text-red-500">{errors.roles}</p>}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
