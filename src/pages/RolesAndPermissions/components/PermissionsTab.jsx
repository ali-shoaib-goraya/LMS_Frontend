import React, { useState, useEffect } from 'react';
import PermissionForm from './PermissionFrom'; 
import PencilIcon from '@/assets/pencil.png'; 
import TrashIcon from '@/assets/trash.png'; 
import LinkIcon from '@/assets/link.png'; 
import permissionService from '../../../services/permissionService';
function PermissionsTab() {
  const [permissions, setPermissions] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', or 'edit'
  const [selectedPermission, setSelectedPermission] = useState(null);

  // Fetch permissions from the server
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await permissionService.getAllPermissions();
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);

  // Handle edit button click
  const handleEdit = (permission) => {
    setSelectedPermission(permission);
    setCurrentView('edit');
  };

  const handleDelete = (permissionId) => {
    try {
      permissionService.deletePermission(permissionId); // API call
      setPermissions((prev) => prev.filter((permission) => permission.id !== permissionId));
      alert('Permission deleted successfully');
      setCurrentView('list');
    } catch (error) {
      console.error('Error deleting permission:', error);
      alert('Failed to delete permission. Please try again.');
    }
  };

  
// Handle status change
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

  const handleCreatePermission = async (newPermission) => {
    try {
      const response = await permissionService.createPermission(newPermission); // API call
      const createdPermission = response.data;

      setPermissions((prev) => [...prev, createdPermission]); // Update list with backend-created item
      setCurrentView('list');
    } catch (error) {
      console.error('Error creating permission:', error);
      alert('Failed to create permission. Please try again.');
    }
  };

  const handleUpdatePermission = async (updatedPermission) => {
  try {
    const response = await permissionService.updatePermission(selectedPermission.id, updatedPermission);
    const updated = response.data;

    setPermissions((prev) =>
      prev.map((permission) =>
        permission.id === selectedPermission.id ? updated : permission
      )
    );

    setCurrentView('list');
    setSelectedPermission(null);
  } catch (error) {
    console.error('Error updating permission:', error);
    alert('Failed to update permission. Please try again.');
  }
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
                          permission.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {permission.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(permission)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <img src={PencilIcon} alt="Edit" className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleChangeStatus(permission.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <img src={LinkIcon} alt="Change Status" className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(permission.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <img src={TrashIcon} alt="Delete" className="h-5 w-5" />
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
