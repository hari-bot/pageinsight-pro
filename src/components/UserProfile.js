import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 pb-6 border-b border-gray-200">
      <div className="text-center sm:text-left mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user.name}
        </h1>
        <h2 className="text-xl text-gray-600">
          Unlock the Insights of Your Pages
        </h2>
      </div>
      <img
        className="rounded-full w-20 h-20 object-cover shadow-md"
        src={user.picture.data.url}
        alt="Profile"
      />
    </div>
  );
};

export default UserProfile;
