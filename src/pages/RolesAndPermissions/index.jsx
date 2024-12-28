import { Routes, Route, Navigate } from 'react-router-dom';
import TabNavigation from './TabNavigation';
import UsersTab from './components/UsersTab';
import RolesTab from './components/RolesTab';
import PermissionsTab from './components/PermissionsTab';

function RolesAndPermissions() {
  return (
    <div className="p-8 flex-1 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Roles & Permissions</h1>
      <TabNavigation />
      <div className="mt-6">
        <Routes>
          <Route path="users" element={<UsersTab />} />
          <Route path="roles" element={<RolesTab />} />
          <Route path="permissions" element={<PermissionsTab />} />
          <Route path="/" element={<Navigate to="users" replace />} />
        </Routes>
      </div>
    </div>
  );
}


export default RolesAndPermissions;