import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import logo from '../assets/logo.png'; 

function FacultyLogin() {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <img
            className="h-12 w-auto"
            src={logo}
            alt="University Logo"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faculty Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          
          Please fill out the following fields to login
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm userType="faculty" />
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
