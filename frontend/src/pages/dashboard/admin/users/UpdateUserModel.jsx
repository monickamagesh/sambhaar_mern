import React, { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

const UpdateUserModel = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);

  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert("Updated role successfully!");
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };
  return (
    <div className="inset-0 z-50 fixed flex items-center justify-center  bg-opacity-20 bg-black">
      <div className="bg-white p-10 rounded-lg shadow-xl  w-1/3">
        <h2 className="text-xl font-bold mb-4 mt-4">Edit User Role</h2>
        
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className=" block focus:outline-none mt-2 p-3 w-full border rounded-md shadow-sm  "
          />
        </div>
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className="text-primary ring-1 ring-primary text-sm bg-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateRole}
            className="bg-primary text-sm text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModel;
