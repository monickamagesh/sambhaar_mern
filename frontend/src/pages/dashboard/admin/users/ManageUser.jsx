import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../../redux/features/auth/authApi";
import avatarImg from "../../../../assets/avatar.png";
import UpdateUserModel from "./UpdateUserModel";

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();

  console.log(users);

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const response = await deleteUser(id).unwrap();
        alert("User deleted successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Sort users with admin users first
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading users data.</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="text-2xl font-bold mb-2">All Users</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-primary text-white active:bg-primary-dark text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr className="">
                    <th className="px-6 py-4 font-medium text-gray-900">ID</th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      User Name
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Phonenumber
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      User role
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {sortedUsers &&
                    sortedUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <th className="px-6 py-4 font-normal ">
                          #ID:{index + 1}
                        </th>
                        <td className="px-6 py-4 font-normal flex items-center gap-3">
                          <div className="relative h-10 w-10 ">
                            <img
                              src={user?.profileImage || avatarImg} // Use the state profileImage here
                              alt="Profile"
                              className=" object-cover rounded-full mx-auto mb-4"
                            />
                          </div>
                          <div>{user?.username}</div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user?.email || "N/A"}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user?.phoneNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                              user?.role === "admin"
                                ? "bg-indigo-100 text-indigo-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {" "}
                            {user?.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2 cursor-pointer hover:text-primary">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <i className="ri-edit-box-line ri-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(user?._id)}
                            className="hover:text-primary-dark text-primary"
                          >
                            <i className="ri-delete-bin-line ri-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <UpdateUserModel
          user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
