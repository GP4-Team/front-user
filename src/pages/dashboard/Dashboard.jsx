import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p className="mb-4">Welcome, {currentUser?.firstName}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">My Profile</h2>
          <p className="mb-2">View and update your personal information</p>
          <button className="text-blue-600 hover:underline">View Profile</button>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">My Activities</h2>
          <p className="mb-2">Track your recent activities</p>
          <button className="text-green-600 hover:underline">View Activities</button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Recent Updates</h2>
        <p>No new updates available.</p>
      </div>
    </div>
  );
};

export default Dashboard;