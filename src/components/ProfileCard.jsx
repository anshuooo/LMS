import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <img src={user.profilePic} alt="Profile" className="rounded-full w-16 h-16" />
      <h2>{user.name}</h2>
      <p>Progress: {user.progress}%</p>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${user.progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProfileCard;
