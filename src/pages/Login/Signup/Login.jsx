import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Stethoscope,
  Shield,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const rememberMe = formData.get("remember") === "on";

    if (!email || !password) {
      showToast(
        "Missing Information",
        "Please enter both email and password.",
        "destructive"
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        {
          email: "doctor@hospital.com",
          password: "doctor123",
          name: "Dr. Kwame Nkrumah",
          role: "General Physician",
        },
        {
          email: "nurse@hospital.com",
          password: "nurse123",
          name: "Nurse Abena Mensah",
          role: "Registered Nurse",
        },
        {
          email: "admin@hospital.com",
          password: "admin123",
          name: "Dr. Kofi Annan",
          role: "Chief Medical Officer",
        },
      ];

      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        showToast("Login Successful", `Welcome back, ${user.name}!`);
        // In a real app, you would navigate to the dashboard here
        console.log("Login successful for:", user);
        console.log("Remember me:", rememberMe);
        console.log("FormData entries:", Object.fromEntries(formData));
      } else {
        showToast(
          "Login Failed",
          "Invalid email or password. Please try again.",
          "destructive"
        );
      }

      setIsLoading(false);
    }, 1500);
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
              Healthcare Worker Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to access the healthcare worker dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sign In
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Enter your credentials to access the healthcare worker
                  interface
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
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
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Demo Credentials Card */}
          {/* <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-200">Demo Credentials</h3>
                  <div className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                    <p>
                      <strong>Doctor:</strong> doctor@hospital.com / doctor123
                    </p>
                    <p>
                      <strong>Nurse:</strong> nurse@hospital.com / nurse123
                    </p>
                    <p>
                      <strong>Admin:</strong> admin@hospital.com / admin123
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
              >
                Sign up here
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

export default Login;
