import { useState } from 'react';
import EditUserForm from './EditUserForm';  
import { allUsers } from '../../../MockData/mockData';  
import { allRoles } from '../../../MockData/mockData';
// Import images for the action buttons
import PencilIcon from '@/assets/pencil.png';
import TrashIcon from '@/assets/trash.png';
import LinkIcon from '@/assets/link.png';

// Available roles for users
const availableRoles = allRoles.map((role) => role.name);

function UsersTab() {
  // State hooks to manage users and the currently edited user
  const [users, setUsers] = useState(allUsers); // List of users
  const [editingUser, setEditingUser] = useState(null); // Track user being edited

  // Function to handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Function to save an updated user
  const handleSave = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null); // Exit editing mode
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditingUser(null); // Exit editing mode without saving
  };

  // Function to delete a user
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Function to change the status of a user (active/inactive)
  const handleChangeStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  // If a user is being edited, render the edit form
  if (editingUser) {
    return (
      <EditUserForm
        user={editingUser}
        availableRoles={availableRoles}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  // Render the list of users when not in editing mode
  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage user roles and permissions
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Roles</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.roles.join(', ')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex space-x-4">
                        {/* Edit button */}
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <img src={PencilIcon} alt="Edit" className="h-5 w-5" />
                        </button>
                        {/* Change status button */}
                        <button
                          onClick={() => handleChangeStatus(user.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <img src={LinkIcon} alt="Change Status" className="h-5 w-5" />
                        </button>
                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(user.id)}
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

export default UsersTab;
