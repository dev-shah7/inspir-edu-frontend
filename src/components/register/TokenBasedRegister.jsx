import { useState, useEffect } from "react";
import { z } from "zod";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../common/Button/Button";
import useAuthStore from "../../store/auth/useAuthStore";
import InputField from "../common/InputField/InputField";

// Zod Validation Schema for User
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase character"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

const TokenBasedRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();
  const { tokenBasedSignup, isLoading } = useAuthStore();

  const [invitationToken, setInvitationToken] = useState("");
  const [userFormData, setUserFormData] = useState({
    name: "InspirEDU",
    email: "",
    password: "",
    phoneNumber: "0900786012",
    address: "",
    city: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set token from URL params
    if (token) {
      setInvitationToken(token);
    }

    // Get email from query parameters
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    if (email) {
      setUserFormData((prev) => ({
        ...prev,
        email: email,
      }));
    }
  }, [location, token]);

  const validateUserDetails = () => {
    try {
      userSchema.parse(userFormData);
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  console.log(errors, "fieldErrors");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUserDetails()) {
      try {
        const payload = {
          name: userFormData.name,
          email: userFormData.email,
          password: userFormData.password,
          address: userFormData.address,
          phoneNumber: userFormData.phoneNumber,
          city: userFormData.city,
          invitationToken,
        };

        await tokenBasedSignup(payload);
        toast.success("User registered successfully!");
        navigate("/login");
      } catch (error) {
        toast.error("Signup failed. Please try again.");
      }
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="email"
            placeholder="Email address *"
            value={userFormData.email}
            onChange={(e) =>
              setUserFormData({ ...userFormData, email: e.target.value })
            }
            error={errors.email}
            Icon={FiMail}
            disabled={true}
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
          {errors.terms && (
            <p className="text-red-500 text-xs">{errors.terms}</p>
          )}

          <Button
            text="Sign Up"
            type="submit"
            className={`w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg`}
          >
            Sign Up
          </Button>

          <div className="text-center text-gray-600 text-sm mt-4">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenBasedRegister;
