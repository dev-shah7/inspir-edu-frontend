import { useState } from "react";
import { z } from "zod";
import InputField from "../common/InputField/InputField";
import Button from "../common/Button/Button";
import {
  FiUser,
  FiMail,
  FiLock,
  FiSend,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Stepper from "../common/Stepper/Stepper";
// import CompanyInfoForm from "./CompanyInfoForm";
// import SubscriptionPlanForm from "./SubscriptionPlanForm";
import useAuthStore from "../../store/auth/useAuthStore";
import { toast } from "react-hot-toast";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
// import { PiCityLight } from "react-icons/pi";

// Zod Validation Schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

// const companySchema = z.object({
//   name: z.string().min(2, "Company name must be at least 2 characters"),
//   logo: z.string().optional(),
//   address: z.string().min(5, "Address must be at least 5 characters"),
//   representativeName: z
//     .string()
//     .min(2, "Representative name must be at least 2 characters"),
//   phoneNumber: z.string().min(10, "Invalid phone number"),
// });

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    // phoneNumber: "",
    // address: "",
    // city: "",
    terms: false,
    role: 1,
  });

  // const [companyFormData, setCompanyFormData] = useState({
  //   name: "",
  //   logo: "",
  //   address: "",
  //   representativeName: "",
  //   phoneNumber: "",
  // });

  // const [selectedPlan, setSelectedPlan] = useState(null);
  const [errors, setErrors] = useState({});

  const { trialSignup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const validateStep = async (step) => {
    setErrors({}); // Clear previous errors

    try {
      switch (step) {
        case 1:
          const userResult = userSchema.safeParse(userFormData);
          if (!userResult.success) {
            const fieldErrors = {};
            userResult.error.errors.forEach((error) => {
              fieldErrors[error.path[0]] = error.message;
            });
            setErrors(fieldErrors);
            return false;
          }
          return true;

        // case 2:
        //   const companyResult = companySchema.safeParse(companyFormData);
        //   if (!companyResult.success) {
        //     const fieldErrors = {};
        //     companyResult.error.errors.forEach((error) => {
        //       fieldErrors[error.path[0]] = error.message;
        //     });
        //     setErrors(fieldErrors);
        //     return false;
        //   }
        //   return true;

        // case 3:
        //   if (!selectedPlan) {
        //     setErrors({ plan: "Please select a subscription plan" });
        //     return false;
        //   }
        //   return true;

        default:
          return false;
      }
    } catch (err) {
      console.error("Validation error:", err);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);

    if (isValid) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setErrors({});
    } else {
      console.log("Validation failed for step:", currentStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => {
        return prev - 1;
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const step1Valid = await validateStep(1);
    // const step2Valid = await validateStep(2);
    // const step3Valid = await validateStep(3);

    if (step1Valid) {
      try {
        const finalData = {
          userDetail: userFormData,
          // companyDetail: companyFormData,
          // subscriptionPlanId: selectedPlan,
          // successUrl: window.location.origin + "/login",
          // cancelUrl: window.location.origin + "/signup",
        };

        await trialSignup(finalData);
        toast.success("Successfully signed up! Please proceed to create your First Course.");
        navigate("/");
      } catch (error) {
        console.log("error is: ", error);
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    } else {
      toast.error("Please complete all required fields correctly.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      await handleSubmit(e);
    } else {
      await handleNext();
    }
  };

  const renderUserForm = () => (
    <div className="space-y-4">
      <InputField
        type="text"
        placeholder="Name *"
        value={userFormData.name}
        onChange={(e) =>
          setUserFormData({ ...userFormData, name: e.target.value })
        }
        error={errors.name}
        icon={LuUser}
      />
      <InputField
        type="email"
        placeholder="Email address *"
        value={userFormData.email}
        onChange={(e) =>
          setUserFormData({ ...userFormData, email: e.target.value })
        }
        error={errors.email}
        icon={MdOutlineEmail}
      />
      <div className="space-y-2">
        <InputField
          type="password"
          placeholder="Password *"
          value={userFormData.password}
          onChange={(e) =>
            setUserFormData({ ...userFormData, password: e.target.value })
          }
          error={errors.password}
          icon={FiLock}
        />
        <div className="text-sm text-bold pl-1">
          Password must contain:
          <ul className="list-disc pl-4 mt-1">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>
      </div>
      {/* <InputField
        type="tel"
        placeholder="Phone Number *"
        value={userFormData.phoneNumber}
        onChange={(e) =>
          setUserFormData({ ...userFormData, phoneNumber: e.target.value })
        }
        error={errors.phoneNumber}
        icon={FiPhone}
      />
      <InputField
        type="text"
        placeholder="Address *"
        value={userFormData.address}
        onChange={(e) =>
          setUserFormData({ ...userFormData, address: e.target.value })
        }
        error={errors.address}
        icon={FiMapPin}
      />
      <InputField
        type="text"
        placeholder="City *"
        value={userFormData.city}
        onChange={(e) =>
          setUserFormData({ ...userFormData, city: e.target.value })
        }
        error={errors.city}
        icon={PiCityLight}
      /> */}
      <div className="flex items-center text-sm text-gray-600">
        <input
          type="checkbox"
          id="terms"
          checked={userFormData.terms}
          onChange={(e) =>
            setUserFormData({ ...userFormData, terms: e.target.checked })
          }
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms" className="ml-2">
          I agree to the terms of service
        </label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderUserForm();
      // case 2:
      //   return (
      //     <CompanyInfoForm
      //       formData={companyFormData}
      //       setFormData={setCompanyFormData}
      //       errors={errors}
      //     />
      //   );
      // case 3:
      //   return (
      //     <div className="w-full">
      //       <SubscriptionPlanForm
      //         selectedPlan={selectedPlan}
      //         setSelectedPlan={setSelectedPlan}
      //       />
      //       {errors.plan && (
      //         <p className="text-red-500 text-xs text-center mt-2">
      //           {errors.plan}
      //         </p>
      //       )}
      //     </div>
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-4xl bg-blue-100 rounded-xl shadow-lg p-8">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            SignUp
          </h2>
          <p className="text-gray-600 font-medium text-sm sm:text-base">
            CREATE AN ACCOUNT
          </p>
        </div>

        <Stepper currentStep={currentStep} />

        <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
          {renderStepContent()}

          <div className="flex justify-end items-center space-x-4 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBack();
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            )}

            <Button
              text={currentStep === 1 ? "Complete Signup" : "Next"}
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 ${
                currentStep === 1
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? "Loading..."
                : currentStep === 1
                ? "Complete Signup"
                : "Next"}
            </Button>
          </div>

          {currentStep === 1 && (
            <>
              <div className="text-center text-gray-600 text-sm">
                Already a member?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
