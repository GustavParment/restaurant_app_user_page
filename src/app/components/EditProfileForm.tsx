"use "
import React from 'react'

const EditProfileForm = () => {

  return (
    <div className="flex flex-col items-center justify-center bg-fuchsia-500 min-h-screen p-4">
      <h1 className="text-white text-2xl font-bold mb-4">Edit Profile</h1>
      
      <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg" >
        {/* Favorite Food Input */}
        <div className="mb-4">
          <label htmlFor="favoriteFood" className="block text-gray-700 font-medium mb-2">
            Favorite Food
          </label>
          <input
            type="text"
            id="favoriteFood"
            
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="Enter your favorite food"
          />
        </div>

        {/* Hobbies Input */}
        <div className="mb-4">
          <label htmlFor="hobbies" className="block text-gray-700 font-medium mb-2">
            Hobbies
          </label>
          <textarea
            id="hobbies"
           
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="Share your hobbies"
            //rows="4"
          />
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-gray-700 font-medium mb-2">
            Upload a Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            //onChange={""}
            className="w-full text-sm text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-fuchsia-600 text-white font-medium rounded-lg hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
