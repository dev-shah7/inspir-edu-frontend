const CourseUserInfo = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-8 p-6">
      <img
        src="https://via.placeholder.com/80"
        alt="Instructor"
        className="rounded-full w-20 h-20 object-cover"
      />
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold">Anke Audenaert</h3>
        <p className="text-sm text-gray-600">
          CEO & Co-Founder<br />
          Aptly, Adj. Professor, UCLA Anderson School of Management
        </p>
      </div>
    </div>
  );
};

export default CourseUserInfo;
