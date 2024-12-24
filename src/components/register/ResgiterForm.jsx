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
import { Link } from "react-router";
import Stepper from "../common/Stepper/Stepper";
import CompanyInfoForm from "./CompanyInfoForm";
import SubscriptionPlanForm from "./SubscriptionPlanForm";
import useAuthStore from "../../store/auth/useAuthStore";
import { toast } from "react-hot-toast";

// Zod Validation Schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  logo: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  representativeName: z
    .string()
    .min(2, "Representative name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
});

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    terms: false,
    role: 1,
  });

  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    logo: "",
    address: "",
    representativeName: "",
    phoneNumber: "",
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [errors, setErrors] = useState({});

  const { signup, isLoading, error } = useAuthStore();

  const validateStep = (step) => {
    console.log("Validating step:", step);
    try {
      switch (step) {
        case 1:
          userSchema.parse(userFormData);
          return true;
        case 2:
          companySchema.parse(companyFormData);
          return true;
        case 3:
          if (!selectedPlan) {
            setErrors({ plan: "Please select a subscription plan" });
            return false;
          }
          return true;
        default:
          return false;
      }
    } catch (err) {
      console.log("Validation error:", err);
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleNext = () => {
    console.log("Current Step before next:", currentStep);
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      console.log("Moving to step:", nextStep);
      setCurrentStep(nextStep);
      setErrors({});
    }
  };

  const handleBack = () => {
    console.log("Handling back button, current step:", currentStep);
    if (currentStep > 1) {
      setCurrentStep((prev) => {
        console.log("Setting step from", prev, "to", prev - 1);
        return prev - 1;
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        const finalData = {
          userDetail: userFormData,
          companyDetail: companyFormData,
          subscriptionPlanId: selectedPlan,
          successUrl: window.location.origin + "/dashboard",
          cancelUrl: window.location.origin + "/signup",
        };

        console.log("finalData", finalData);
        await signup(finalData);
        toast.success("Signup successful! Redirecting to dashboard...");
        // Redirect will happen automatically through routing due to auth state change
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted, current step:", currentStep);
    if (currentStep === 3) {
      handleSubmit(e);
    } else {
      handleNext();
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
        Icon={FiUser}
      />
      <InputField
        type="email"
        placeholder="Email address *"
        value={userFormData.email}
        onChange={(e) =>
          setUserFormData({ ...userFormData, email: e.target.value })
        }
        error={errors.email}
        Icon={FiMail}
      />
      <InputField
        type="password"
        placeholder="Password * (at least 8 characters)"
        value={userFormData.password}
        onChange={(e) =>
          setUserFormData({ ...userFormData, password: e.target.value })
        }
        error={errors.password}
        Icon={FiLock}
      />
      <InputField
        type="tel"
        placeholder="Phone Number *"
        value={userFormData.phoneNumber}
        onChange={(e) =>
          setUserFormData({ ...userFormData, phoneNumber: e.target.value })
        }
        error={errors.phoneNumber}
        Icon={FiPhone}
      />
      <InputField
        type="text"
        placeholder="Address *"
        value={userFormData.address}
        onChange={(e) =>
          setUserFormData({ ...userFormData, address: e.target.value })
        }
        error={errors.address}
        Icon={FiMapPin}
      />
      <InputField
        type="text"
        placeholder="City *"
        value={userFormData.city}
        onChange={(e) =>
          setUserFormData({ ...userFormData, city: e.target.value })
        }
        error={errors.city}
        Icon={FiMapPin}
      />
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
    console.log("Rendering Step:", currentStep);
    switch (currentStep) {
      case 1:
        return renderUserForm();
      case 2:
        return (
          <CompanyInfoForm
            formData={companyFormData}
            setFormData={setCompanyFormData}
            errors={errors}
          />
        );
      case 3:
        console.log("Rendering Subscription Plan Form");
        return (
          <div className="w-full">
            <SubscriptionPlanForm
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
            {errors.plan && (
              <p className="text-red-500 text-xs text-center mt-2">
                {errors.plan}
              </p>
            )}
          </div>
        );
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
                  console.log("Back button clicked");
                  handleBack();
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
            )}

            <Button
              text={currentStep === 3 ? "Complete Signup" : "Next"}
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 ${
                currentStep === 3
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? "Loading..."
                : currentStep === 3
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
