export const UserRoles = {
  Superadmin: 1,
  Admin: 2,
  Student: 3,
  Manager: 4,
};

export const lookupService = {
  getUserRoleLabel: (roleId) => {
    switch (roleId) {
      case UserRoles.Superadmin:
        return {
          label: "Superadmin",
          className: "bg-purple-100 text-purple-800 border border-purple-200",
        };
      case UserRoles.Admin:
        return {
          label: "Admin",
          className: "bg-blue-100 text-blue-800 border border-blue-200",
        };
      case UserRoles.Student:
        return {
          label: "Student",
          className: "bg-green-100 text-green-800 border border-green-200",
        };
      case UserRoles.Manager:
        return {
          label: "Manager",
          className: "bg-amber-100 text-amber-800 border border-amber-200",
        };
      default:
        return {
          label: "Unknown",
          className: "bg-gray-100 text-gray-800 border border-gray-200",
        };
    }
  },

  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};
