import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 text-center space-y-4">
          <h1 className="font-outfit text-4xl sm:text-5xl leading-[3rem] sm:leading-[5rem] font-semibold text-gray-700">
            WELCOME <br /> TO
          </h1>
          <h2 className="text-4xl sm:text-6xl font-bold text-button-blue flex items-center justify-center mb-6">
            <span className="text-yellow-400 mr-2">💡</span> inspirEDU
          </h2>
          <p className="text-2xl text-gray-700 text-center leading-relaxed max-w-md mx-auto">
            Lorem ipsum dolor sit amet consectetur. Pellentesque dui vivamus etiam senectus nulla rhoncus in fermentum non.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login