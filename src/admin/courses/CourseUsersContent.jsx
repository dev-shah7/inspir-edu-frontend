import React, { useState, useMemo } from "react";
import useModalStore from "../store/useModalStore";
import UserDetailsContent from "./UserDetailsContent";
import { IoMdInformationCircleOutline, IoMdSearch } from "react-icons/io";

const CourseUsersContent = ({ courseId }) => {
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Hardcoded data for now
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      joinedDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Student",
      joinedDate: "2024-03-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Student",
      joinedDate: "2024-03-13",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Teacher",
      joinedDate: "2024-03-12",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewDetails = (user) => {
    openModal(
      `User Details - ${user.name}`,
      <UserDetailsContent user={user} />,
      {
        isStacked: true,
      }
    );
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="space-y-4">
        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#ECF5FF] pt-2">
          <p className="text-gray-600">Total Users: {users.length}</p>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Joined Date
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "Teacher"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="View Details"
                    >
                      <IoMdInformationCircleOutline className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseUsersContent;
