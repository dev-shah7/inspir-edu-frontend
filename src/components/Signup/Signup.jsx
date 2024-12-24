import SignUpForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-stretch lg:space-x-8">
        {/* Left Section - Fixed (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-8 text-center space-y-4">
          <h1 className="font-outfit text-4xl sm:text-5xl leading-[3rem] sm:leading-[5rem] font-semibold text-gray-700">
            WELCOME <br /> TO
          </h1>
          <h2 className="text-4xl sm:text-6xl font-bold text-button-blue flex items-center justify-center mb-6">
            <span className="text-yellow-400 mr-2">💡</span> inspirEDU
          </h2>
          <p className="text-2xl text-gray-700 text-center leading-relaxed max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur. Pellentesque dui vivamus
            etiam senectus nulla rhoncus in fermentum non.
          </p>
        </div>

        {/* Right Section - Scrollable (60%) */}
        <div className="w-full lg:w-[60%] flex justify-center items-center lg:h-screen lg:overflow-hidden">
          <div className="w-full lg:max-h-screen lg:overflow-y-auto custom-scrollbar">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
