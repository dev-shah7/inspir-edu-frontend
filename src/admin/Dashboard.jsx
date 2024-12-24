import Card from "./common/Card/Card";
import CreateCourseContent from "./courses/CreateCourseContent";
import useModalStore from "./store/useModalStore";

const Dashboard = () => {
  const { openModal } = useModalStore();

  const handleAddCourse = () => {
    openModal("Create Course", <CreateCourseContent mode="add" />);
  };

  return (
    <>
      <h1 className="mt-4 text-3xl font-bold text-gray-800">
        Hi, Syed Maaz Shah
      </h1>
      <p className="text-lg text-gray-600 mt-1">
        Welcome to inspireEDU Dashboard
      </p>
      <div className="mt-4 h-0.5 bg-gradient-to-r from-custom-div-blue to-transparent"></div>

      {/* Add Course Card */}
      <div className="my-5">
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
