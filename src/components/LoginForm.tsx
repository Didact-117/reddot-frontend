"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api-routes/user_routes"; // Import API function

export default function LoginForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await login(formData.email, formData.password);
    
    if (response.success) {
      router.push("/profile"); // Redirect on success
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-none p-6 rounded-lg w-[400px] sm:w-[500px]">

      <form onSubmit={handleSubmit} className="w-full mt-6">
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-lg font-mono text-[#222222]">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-300 border border-[#D90824] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#D90824]"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-lg font-mono text-[#222222]">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-300 border border-[#D90824] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#D90824]"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 font-bold">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-[30%] bg-[#D90824] text-white font-bold py-3 rounded-md hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-4 text-[#222222] text-sm">
        No account? <a href="/signup" className="text-[#D90824] font-bold">Sign up here.</a>
      </p>
    </div>
  );
}