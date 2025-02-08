import Card from "./common/Card/Card";
import CreateCourseContent from "./courses/CreateCourseContent";
import useModalStore from "./store/useModalStore";
import useAuthStore from "../store/auth/useAuthStore";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { openModal } = useModalStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleAddCourse = () => {
    openModal("Create Course", <CreateCourseContent mode="add" />);
    navigate('courses');
  };

  return (
    <>
      <h1 className="mt-6 text-4xl font-bold text-gray-800">
        Hi, {user?.name || "Admin"}
      </h1>
      <p className="text-xl text-gray-600 mt-2">
        Welcome to inspireEDU Dashboard
      </p>
      <div className="mt-6 h-1 bg-gradient-to-r from-custom-div-blue to-transparent"></div>

      {/* Add Course Card */}
      <div className="my-8">
        <Card
          title="Add new Course"
          buttonText="Add Course"
          onClick={handleAddCourse}
        />
      </div>
    </>
  );
};

export default Dashboard;
