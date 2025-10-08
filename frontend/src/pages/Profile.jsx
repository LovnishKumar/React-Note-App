import React from "react";
import { UserAuth } from "../context/ContextProvider";
import moment from "moment";


const ProfilePage = () => {
    const {user} = UserAuth();

    function getInitials() {
  if (!user?.name) return "";
  const nameParts = user.name.trim().split(" ");
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
  const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.[0]?.toUpperCase() : "";
  return firstInitial + lastInitial;
}

  return (
    <div className="flex w-4/5 mx-auto my-24 p-5 rounded-lg shadow-lg text-gray-800">
    
      <div className="w-1/3 flex justify-center">
       
        {user?.profilePic && <img
          src=""
          alt="Profile Pic"
          className="w-60 h-60 rounded-full border-4 border-gray-300"
        />}
        {!user?.profilePic && <div className="w-60 h-60 rounded-full border-4 border-gray-300 flex items-center justify-center text-6xl font-bold">
          {getInitials()}  
        </div>}
      </div>

      {/* Profile Info */}
      <div className="w-2/3 px-4 py-7">
        <div className="pb-3 border-b border-gray-300 mb-7">
          <h1 className="text-3xl font-semibold">{user.name}</h1>
        </div>
        <div className="mb-2">
          <b>Email: </b> {user.email}
        </div>
        <div className="mb-6">
          <b>Account Created: </b> {moment(user.createdAt).format('MMM DD, YYYY')}
        </div>

        {/* File Upload */}
        <div className="pt-7">
          <input
            type="file"
            className="file:border-2 file:border-gray-300 file:bg-gray-800 file:text-white
                       file:px-4 file:py-2 file:rounded hover:file:bg-gray-100 hover:file:text-gray-800
                       active:file:bg-gray-200 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
