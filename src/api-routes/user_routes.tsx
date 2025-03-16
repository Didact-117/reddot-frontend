import axios from "axios";

const API_BASE_URL = "http://localhost:8000/users";

// Helper function to store user ID in localStorage
const setUserId = (userId) => {
  localStorage.setItem("userID", userId);
};

// ✅ Login function (stores userID in localStorage, relies on cookies for token)
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      { withCredentials: true } // 👈 Makes sure cookies are included!
    );

    if (response.data && response.data.user_id) {
      setUserId(response.data.user_id);
    }

    return { success: true, message: "Login successful" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

// ✅ Register function
export const register = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register`,
      userData,
      { withCredentials: true } // Ensures cookies are included
    );

    if (response.data && response.data.user_id) {
      console.log("Registration successful for:", response.data.email);
      return { success: true, message: "Registration successful" };
    }

    return { success: false, message: "Registration failed" };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Signup failed" };
  }
};

// ✅ Logout function (removes userID from localStorage, cookie is deleted on backend)
export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });

    localStorage.removeItem("userID"); // Remove user ID locally

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Logout failed" };
  }
};


// ✅ Fetch User Profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      withCredentials: true, // Ensures cookies are sent
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to fetch profile" };
  }
};


// ✅ Update User Profile (Authenticated)
export const updateUserProfile = async (updates: Record<string, string>, oldPassword?: string, newPassword?: string) => {
  try {
    const payload: any = { updates };
    if (oldPassword && newPassword) {
      payload.old_password = oldPassword;
      payload.new_password = newPassword;
    }

    const response = await axios.put(`${API_BASE_URL}/update`, payload, { withCredentials: true });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to update profile" };
  }
};