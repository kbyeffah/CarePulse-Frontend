import { useState, useRef } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
  UserPlus,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 4000);
  };

  const validateForm = (formData) => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const role = formData.get("role");
    const agreeToTerms = formData.get("agreeToTerms") === "on";

    if (!firstName || !lastName || !email || !password || !role) {
      showToast(
        "Missing Information",
        "Please fill in all required fields.",
        "destructive"
      );
      return false;
    }

    if (password !== confirmPassword) {
      showToast(
        "Password Mismatch",
        "Passwords do not match. Please try again.",
        "destructive"
      );
      return false;
    }

    if (password.length < 6) {
      showToast(
        "Weak Password",
        "Password must be at least 6 characters long.",
        "destructive"
      );
      return false;
    }

    if (!agreeToTerms) {
      showToast(
        "Terms Required",
        "Please agree to the terms and conditions.",
        "destructive"
      );
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Create FormData from the form
    const formData = new FormData(formRef.current);

    if (!validateForm(formData)) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock registration - in real app, this would call an API
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.get("email"),
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        role: formData.get("role"),
        licenseNumber: formData.get("licenseNumber"),
        hospital: formData.get("hospital"),
        verified: false,
      };

      console.log("New user registered:", newUser);
      console.log("FormData entries:", Object.fromEntries(formData));

      showToast(
        "Account Created Successfully",
        `Welcome to HealthCare Portal, ${newUser.name}!`
      );

      // Reset form
      formRef.current.reset();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                HealthCare Portal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-lg shadow-lg max-w-sm ${
              toast.variant === "destructive"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-green-50 border border-green-200 text-green-800"
            }`}
          >
            <div className="font-medium">{toast.title}</div>
            <div className="text-sm mt-1">{toast.description}</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex justify-center mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Healthcare Worker Registration
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create your account to access the healthcare worker dashboard
            </p>
          </div>

          {/* Signup Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Account
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fill in your professional information to get started
                </p>
              </div>

              <div ref={formRef} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Professional Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select your role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="physician-assistant">
                      Physician Assistant
                    </option>
                    <option value="nurse-practitioner">
                      Nurse Practitioner
                    </option>
                    <option value="medical-assistant">Medical Assistant</option>
                    <option value="specialist">Specialist</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="licenseNumber"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    License Number
                  </label>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="MD123456"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="hospital"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Hospital/Clinic
                  </label>
                  <input
                    id="hospital"
                    name="hospital"
                    type="text"
                    placeholder="General Hospital"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm text-gray-700 dark:text-gray-300 leading-5"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Account Verification Card */}
          {/* <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200">Account Verification</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    In a production environment, healthcare worker accounts would require verification of credentials
                    and approval by administrators before access is granted.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2025 HealthCare Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Signup;
