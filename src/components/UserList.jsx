import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";

const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const UserList = () => {
  const [userListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const userData = await axios.get(`${BACKEND_LINK}/user`);
    try {
      setUserListData(userData.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${BACKEND_LINK}/user/${id}`);
      setUserListData((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          User List
        </h2>

        {/* Loader */}
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                  <th className="px-4 py-3 text-center">Sr. No.</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Password</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userListData.length > 0 ? (
                  userListData.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-center font-medium text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 capitalize">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 text-gray-500">{user.password}</td>
                      <td className="px-4 py-3 flex justify-center">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="p-2 rounded-full hover:bg-red-100 transition"
                        >
                          <FaTrash className="text-gray-600 hover:text-red-500 text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No users available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
