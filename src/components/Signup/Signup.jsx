import SignUpForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg">
      <div className="flex w-full max-w-7xl">
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2 text-center">
            WELCOME <br /> TO
          </h1>
          <h2 className="text-5xl font-bold text-button-blue flex items-center mb-6">
            <span className="text-yellow-400 mr-2">💡</span> inspirEDU
          </h2>
          <p className="text-gray-700 text-center leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur. Pellentesque dui vivamus
            etiam senectus nulla rhoncus in fermentum non.
          </p>
        </div>

        {/* Right Section */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
