const CourseHeading = ({ name, companyName }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-slate-900">
        {name || "Introduction to the Course"}
      </h1>
      <p className="text-gray-600">by {companyName || "InspirEDU"}</p>
    </div>
  )
}

export default CourseHeading;