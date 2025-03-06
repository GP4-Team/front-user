import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      
      {currentUser ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <p><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Edit Profile
                </button>
              </div>
              <div>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default ProfilePage;