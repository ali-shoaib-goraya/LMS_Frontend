import React, { useState } from 'react';
import { PencilIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/outline';
import { allRoles } from '../../../MockData/mockData';
import RoleForm from './RoleForm';

const RoleNames = allRoles.map((role) => role.name);

function RolesTab() {
  const [roles, setRoles] = useState(allRoles);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', or 'edit'
  const [selectedRole, setSelectedRole] = useState(null);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setCurrentView('edit');
  };

  const handleDelete = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleChangeStatus = (roleId) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId
          ? { ...role, status: role.status === 'Active' ? 'Inactive' : 'Active' }
          : role
      )
    );
  };

  const handleCreateRole = (newRole) => {
    setRoles(prev => [...prev, { 
      ...newRole, 
      id: Date.now(), 
      status: newRole.isActive ? 'Active' : 'Inactive'
    }]);
    setCurrentView('list');
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles(prev => prev.map(role => 
      role.id === selectedRole.id 
        ? { 
            ...role, 
            ...updatedRole, 
            status: updatedRole.isActive ? 'Active' : 'Inactive'
          }
        : role
    ));
    setCurrentView('list');
    setSelectedRole(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedRole(null);
  };

  // Render form view (create or edit)
  if (currentView === 'create' || currentView === 'edit') {
    const filteredRoleNames = currentView === 'edit' 
    ? RoleNames.filter((roleName) => roleName !== selectedRole?.name) 
    : RoleNames;
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
        <RoleForm 
          initialData={selectedRole}
          onSubmit={currentView === 'create' ? handleCreateRole : handleUpdateRole}
          onCancel={handleCancel}
          RoleNames={filteredRoleNames}
        />
      </div>
    );
  }

  // Render roles list view
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
          >
            Add Role
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                      {role.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          role.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {role.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(role)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleChangeStatus(role.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <LinkIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesTab;