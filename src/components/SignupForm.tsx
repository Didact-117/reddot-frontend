"use client";
import { useState } from "react";
import { register, login } from "@/api-routes/user_routes"; // Import API functions
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter(); // For redirecting after login

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    email: "",
    password: "",
    linkedin_url: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for button
  const [error, setError] = useState<string | null>(null); // Error handling

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call the register function
    const registerResponse = await register(formData);

    if (!registerResponse.success) {
      setError(registerResponse.message);
      setLoading(false);
      return;
    }

    // If registration is successful, auto-login
    const loginResponse = await login(formData.email, formData.password);

    if (!loginResponse.success) {
      setError(loginResponse.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard"); // Redirect to the main page after login
  };

  return (
    <div className="flex flex-col items-center bg-[none] p-6 rounded-lg w-[750px] sm:w-[650px]">
      <h1 className="text-3xl font-bold text-[#222222]">Sign Up</h1>

      {/* Back to Login */}
      <p className="mt-4 text-[#222222] text-sm text-center">
        Have an account? <a href="/" className="text-[#D90824] font-bold">Back to login.</a>
      </p>

      <form onSubmit={handleSubmit} className="w-full mt-6 flex flex-col gap-4">
        {/* Input Fields */}
        {[
          { label: "First Name", name: "fname" },
          { label: "Last Name", name: "lname" },
          { label: "Phone", name: "phone" },
          { label: "Country", name: "country" },
          { label: "State/Province", name: "state" },
          { label: "City", name: "city" },
          { label: "Address", name: "address" },
          { label: "Email", name: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "LinkedIn URL", name: "linkedin_url" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-[200px] text-lg font-mono text-[#222222]">{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="flex-grow p-3 w-full sm:w-[420px] bg-gray-300 border border-[#D90824] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#D90824]"
            />
          </div>
        ))}

        {/* Error Message */}
        {error && <p className="text-red-600 font-bold text-center">{error}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          className="w-[150px] mx-auto bg-[#D90824] text-white font-bold py-3 rounded-md hover:bg-red-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}