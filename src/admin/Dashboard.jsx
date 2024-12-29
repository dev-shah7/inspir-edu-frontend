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
      <h1 className="mt-6 text-4xl font-bold text-gray-800">
        Hi, Syed Maaz Shah
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
