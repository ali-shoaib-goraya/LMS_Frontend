import React, { useState } from 'react';
import { PencilIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/outline';
import { allPermissions } from '../../../MockData/mockData'; // Ensure the path is correct
import PermissionForm from './PermissionFrom'; 
function PermissionsTab() {
  const [permissions, setPermissions] = useState(allPermissions);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', or 'edit'
  const [selectedPermission, setSelectedPermission] = useState(null);

  const handleEdit = (permission) => {
    setSelectedPermission(permission);
    setCurrentView('edit');
  };

  const handleDelete = (permissionId) => {
    setPermissions(permissions.filter((permission) => permission.id !== permissionId));
  };

  const handleChangeStatus = (permissionId) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === permissionId
          ? {
              ...permission,
              status: permission.status === 'Active' ? 'Inactive' : 'Active',
            }
          : permission
      )
    );
  };

  const handleCreatePermission = (newPermission) => {
    setPermissions((prev) => [
      ...prev,
      { ...newPermission, id: Date.now() },
    ]);
    setCurrentView('list');
  };

  const handleUpdatePermission = (updatedPermission) => {
    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === selectedPermission.id ? { ...permission, ...updatedPermission } : permission
      )
    );
    setCurrentView('list');
    setSelectedPermission(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedPermission(null);
  };

  // Render form view (create or edit)
  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="mt-8">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentView === 'create' ? 'Create New Permission' : 'Edit Permission'}
            </h2>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Back to Permissions
            </button>
          </div>
        </div>
        <PermissionForm
          initialData={selectedPermission}
          onSubmit={currentView === 'create' ? handleCreatePermission : handleUpdatePermission}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Render permissions list view
  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Permissions</h2>
          <p className="mt-2 text-sm text-gray-700">
            View and manage system permissions
          </p>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0">
          <button
            type="button"
            onClick={() => setCurrentView('create')}
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            Add Permission
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
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {permission.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {permission.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          permission.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {permission.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(permission)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleChangeStatus(permission.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <LinkIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(permission.id)}
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

export default PermissionsTab;
