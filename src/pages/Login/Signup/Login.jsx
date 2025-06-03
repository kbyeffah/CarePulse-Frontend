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
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ borderBottomColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>
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
                ? "border text-red-800"
                : "border text-green-800"
            }`}
            style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
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
              className="inline-flex items-center gap-2 mb-6 transition-colors"
              style={{ color: 'var(--text-color)' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}>
                <Stethoscope className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
              Healthcare Worker Login
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-color)' }}>
              Sign in to access the healthcare worker dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-lg shadow-sm" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                  Sign In
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-color)' }}>
                  Enter your credentials to access the healthcare worker interface
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-color)' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    required
                    className="w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-color)' }}
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
                      className="w-full px-3 py-2 pr-10 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{ color: 'var(--text-color)' }}
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
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                    style={{ borderColor: 'var(--text-color)' }}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm"
                    style={{ color: 'var(--text-color)' }}
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}
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
                    className="text-sm"
                    style={{ color: 'var(--text-color)' }}
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--text-color)' }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium"
                style={{ color: 'var(--text-color)' }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderTopColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm" style={{ color: 'var(--text-color)' }}>
            © 2025 HealthCare Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;