import React, { useState, useEffect } from 'react';
import RoleForm from './RoleForm';
import PencilIcon from '@/assets/pencil.png';
import TrashIcon from '@/assets/trash.png';
import LinkIcon from '@/assets/link.png';
import roleService from '../../../services/roleService';

function RolesTab() {
  const [roles, setRoles] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await roleService.getRoles();
      setRoles(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Failed to fetch roles');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const roleNames = roles.map(role => role.name);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setCurrentView('edit');
  };

  const handleDelete = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await roleService.deleteRole(roleId);
        setRoles(roles.filter((role) => role.id !== roleId));
      } catch (error) {
        console.error('Error deleting role:', error);
        setError('Failed to delete role');
      }
    }
  };

  const handleChangeStatus = async (role) => {
    try {
      const updatedRole = {
        ...role,
        status: !role.status
      };
      
      await roleService.updateRole(role.id, updatedRole);
      
      setRoles(roles.map((r) =>
        r.id === role.id ? { ...r, status: !r.status } : r
      ));
    } catch (error) {
      console.error('Error updating role status:', error);
      setError('Failed to update role status');
    }
  };

  const handleCreateRole = async (newRoleData) => {
    try {
      const response = await roleService.createRole(newRoleData);
      
      // Add the new role to the list
      const createdRole = response.data;
      setRoles(prev => [...prev, createdRole]);
      
      setCurrentView('list');
      setError('');
    } catch (error) {
      console.error('Error creating role:', error);
      setError('Failed to create role');
      throw error; // Re-throw to let RoleForm handle the error
    }
  };

  const handleUpdateRole = async (updatedRoleData) => {
    try {
      const response = await roleService.updateRole(selectedRole.id, updatedRoleData);
      
      // Update the role in the list
      const updatedRole = response.data;
      setRoles(prev => prev.map(role =>
        role.id === selectedRole.id ? updatedRole : role
      ));
      
      setCurrentView('list');
      setSelectedRole(null);
      setError('');
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Failed to update role');
      throw error; // Re-throw to let RoleForm handle the error
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedRole(null);
    setError('');
  };

  if (currentView === 'create' || currentView === 'edit') {
    const filteredRoleNames =
      currentView === 'edit'
        ? roleNames.filter((name) => name !== selectedRole?.name)
        : roleNames;

    return (
      <div className="mt-8">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === 'create' ? 'Create New Role' : 'Edit Role'}
            </h2>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Back to Roles
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        <RoleForm
          initialData={selectedRole}
          onSubmit={currentView === 'create' ? handleCreateRole : handleUpdateRole}
          onCancel={handleCancel}
          RoleNames={filteredRoleNames}
        />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Roles</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage system roles and their permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            onClick={() => setCurrentView('create')}
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
            disabled={loading}
          >
            Add Role
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading roles...</p>
              </div>
            ) : roles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No roles found</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {role.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {role.description || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            role.status
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {role.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEdit(role)}
                            className="text-gray-400 hover:text-gray-500"
                            title="Edit Role"
                          >
                            <img src={PencilIcon} alt="Edit" className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleChangeStatus(role)}
                            className="text-gray-400 hover:text-gray-500"
                            title="Toggle Status"
                          >
                            <img src={LinkIcon} alt="Change Status" className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="text-red-400 hover:text-red-500"
                            title="Delete Role"
                          >
                            <img src={TrashIcon} alt="Delete" className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesTab;