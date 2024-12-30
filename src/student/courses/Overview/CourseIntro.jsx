const CourseIntro = ({ description }) => {
  return (
    <div className="mb-8 text-lg">
      <h2 className="text-3xl font-semibold mb-4">About this Course</h2>
      <p className="mb-4 text-gray-800">
        This course lays the foundation of social media marketing. You’ll
        learn what social media marketing entails, including the history and
        the different social media channels that exist. You’ll learn how to
        select a social media channel that fits your needs, set goals and
        success metrics, and determine who your target audience is.
      </p>
      <p className="mb-4 text-gray-800">
        By the end of this course, you will be able to:
      </p>
      <ul className="list-disc list-inside text-gray-800 mb-4">
        <li>Understand the landscape of traditional, digital, and social media marketing</li>
        <li>Understand how to become certified as a Digital Marketing Associate</li>
        <li>
          Understand the major social media platforms, how they function, and
          what role they play in marketing
        </li>
        <li>Create SMART goals and identify KPIs</li>
        <li>Define your target audience and their customer journey</li>
        <li>Choose the right social media platforms and learn how to create social media policies</li>
      </ul>
      <p className="text-gray-800">
        Whatever level of knowledge you start with, this course will help you
        build a solid foundation for social media marketing and gain
        applicable skills that will allow you to make your social media
        marketing efforts more successful and noticeable.
      </p>
    </div>
  )
}

export default CourseIntro;