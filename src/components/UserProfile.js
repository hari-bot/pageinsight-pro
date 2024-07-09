import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-4xl font-semibold">Welcome, {user.name}</h1>
        <h2 className="text-xl text-gray-500">
          Unlock the Insights of Your Pages
        </h2>
      </div>
      <img className="rounded-full" src={user.picture.data.url} alt="Profile" />
    </div>
  );
};

export default UserProfile;
