import React, { useState, useMemo, useEffect } from "react";
import useModalStore from "../store/useModalStore";
import UserDetailsContent from "./UserDetailsContent";
import { IoMdInformationCircleOutline, IoMdSearch } from "react-icons/io";
import { FaUserCheck, FaUserClock, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Loader from "../../components/common/Loader/Loader";
import { courseService } from "../../services/api/courseService";
import { lookupService } from "../../services/lookupService";

const CourseUsersContent = ({ courseId }) => {
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setIsLoading(true);
        const response = await courseService.getCourseInvitations(courseId);
        if (response.isSuccess) {
          setInvitations(response.data);
        } else {
          toast.error(response.message || "Failed to fetch invitations");
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
        toast.error("Failed to fetch invitations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitations();
  }, [courseId]);

  const filteredInvitations = useMemo(() => {
    return invitations.filter(
      (invitation) =>
        invitation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitation.registeredUser?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, invitations]);

  const handleViewDetails = (invitation) => {
    openModal(
      `User Details - ${invitation.registeredUser?.name || invitation.email}`,
      <UserDetailsContent
        user={invitation.registeredUser || { email: invitation.email }}
        courseId={courseId}
        userId={invitation.registeredUser?.id}
      />,
      {
        isStacked: true,
        size: "lg",
      }
    );
  };

  const getUserRoleLabel = (roleId) => {
    return lookupService.getUserRoleLabel(roleId);
  };

  return (
    <div className="bg-gray-50 rounded-xl">
      <div className="space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Total Invitations
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {invitations.length}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaUserCheck className="text-green-500" />
                <span className="text-sm font-medium text-gray-500">
                  Registered Users
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {invitations.filter((inv) => inv.registeredUser).length}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaUserClock className="text-orange-500" />
                <span className="text-sm font-medium text-gray-500">
                  Pending Registrations
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {invitations.filter((inv) => !inv.registeredUser).length}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-100">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                      Status
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
                  {filteredInvitations.map((invitation) => {
                    const role = getUserRoleLabel(invitation.userRole);
                    return (
                      <tr
                        key={invitation.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          {invitation.registeredUser ? (
                            <div className="flex items-center space-x-2 text-green-600">
                              <FaUserCheck className="text-lg" />
                              <span className="text-sm font-medium">
                                Registered
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 text-orange-500">
                              <FaUserClock className="text-lg" />
                              <span className="text-sm font-medium">
                                Pending
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 truncate">
                          <span className="text-sm text-gray-700">
                            {invitation.email}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1.5 text-xs font-medium rounded-full ${role.className}`}
                          >
                            {role.label}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <FaCalendarAlt className="text-sm" />
                            <span className="text-sm">
                              {invitation.registeredUser
                                ? lookupService.formatDate(
                                    invitation.registeredUser.createdDate
                                  )
                                : "-"}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleViewDetails(invitation)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="View Details"
                          >
                            <IoMdInformationCircleOutline className="text-xl" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredInvitations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No users found matching your search.
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseUsersContent;
