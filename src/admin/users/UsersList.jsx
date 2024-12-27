import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import useModalStore from "../store/useModalStore";
import Table from "../common/Table/Table";
import Loader from "../../components/common/Loader/Loader";
import { toast } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import InviteUsersContent from "./InviteUsersContent";
import UserDetailsContent from "./UserDetailsContent";
import { userService } from "../../services/api/userService";
import useAuthStore from "../../store/auth/useAuthStore";

const RolePill = ({ role }) => {
  const getRoleColor = () => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "instructor":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor()}`}
    >
      {role}
    </span>
  );
};

const UsersList = () => {
  const { openModal } = useModalStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOperationLoading, setIsOperationLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers();

      console.log(response);
      if (response.isSuccess === true) {
        setUsers(response.data);
      } else {
        toast.error(response.message);
        setUsers([]);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users?.filter(
      (user) =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const handleInviteUser = () => {
    openModal(
      "Invite User",
      <InviteUsersContent companyId={user?.companyId} />
    );
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsOperationLoading(true);
      try {
        const response = await userService.deleteUser(userId);
        if (response.isSuccess) {
          setUsers(users.filter((user) => user.id !== userId));
          toast.success("User deleted successfully");
        } else {
          toast.error(response.message || "Failed to delete user");
        }
      } catch (error) {
        toast.error("Failed to delete user");
      } finally {
        setIsOperationLoading(false);
      }
    }
  };

  const handleUserDetails = (user) => {
    openModal("User Details", <UserDetailsContent user={user} />);
  };

  const headers = [
    { label: "Name", align: "left" },
    { label: "Email", align: "left" },
    { label: "Roles", align: "left" },
    { label: "Action", align: "center" },
  ];

  const renderRow = (user) => (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="py-3 px-4 sm:px-2">{user.name || "-"}</td>
        <td className="py-3 px-4 sm:px-2">{user.email || "-"}</td>
        <td className="py-3 px-4 sm:px-2">
          <div className="flex flex-wrap gap-1">
            {user.roles?.map((role, index) => (
              <RolePill key={index} role={role} />
            ))}
          </div>
        </td>
        <td className="py-3 px-4 sm:px-2 text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center">
            <CustomButton
              text="User Details"
              className="w-full sm:w-auto text-sm bg-custom-button-green hover:bg-green-700"
              onClick={() => handleUserDetails(user)}
            />
          </div>
        </td>
      </tr>
      {filteredUsers.indexOf(user) !== filteredUsers.length - 1 && (
        <tr>
          <td colSpan={headers.length}>
            <div className="h-0.5 bg-custom-border-blue"></div>
          </td>
        </tr>
      )}
    </>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Users Found
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        There are no users in the system yet. Start by inviting users to join.
      </p>
      <button
        onClick={handleInviteUser}
        className="px-6 py-2 mt-4 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring transition flex items-center gap-1"
      >
        <IoMdAdd className="text-xl" /> Invite Users
      </button>
    </div>
  );

  if (isLoading && users.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] px-4 md:px-6">
      <p className="text-md text-gray-600 mb-4">Users</p>
      <div className="flex flex-col mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                All Users
              </h1>
              <button
                onClick={handleInviteUser}
                className="w-full lg:w-auto px-4 py-2 bg-custom-button-green hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring transition flex items-center gap-1 justify-center"
              >
                <IoMdAdd className="text-md" /> Invite Users
              </button>
            </div>
          </div>
          <div className="relative w-full lg:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="h-0.5 bg-custom-border-blue mt-1"></div>
      </div>

      <div className="flex-1 overflow-x-auto">
        {filteredUsers.length > 0 ? (
          <div className="min-w-full">
            <Table
              headers={headers}
              data={filteredUsers}
              renderRow={renderRow}
            />
          </div>
        ) : (
          renderEmptyState()
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-t-2 border-custom-border-blue mt-4 gap-4">
        <div className="text-sm md:text-base text-gray-600">
          Rows per page: 10
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled
            className="text-sm md:text-base text-blue-500 font-medium text-gray-400 cursor-not-allowed"
          >
            <IoIosArrowBack size={20} />
          </button>
          <span className="text-sm md:text-base text-gray-600 font-medium">
            1-1
          </span>
          <button className="text-sm md:text-base text-blue-500 font-medium hover:text-blue-700">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>

      {isOperationLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
