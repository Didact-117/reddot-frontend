import axios from "axios";

const API_BASE_URL = "http://localhost:8000/resumes";

// ✅ Store Resume (Authenticated)
export const storeResume = async (fileUrl: string, resumeName: string, isDefault: boolean) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/store`,
      {
        file_url: fileUrl,
        resume_name: resumeName,
        is_default: isDefault,
      },
      { withCredentials: true } // Ensures cookies are sent for authentication
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to store resume" };
  }
};

// ✅ Get User Resumes (Authenticated)
export const getUserResumes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to retrieve resumes" };
  }
};

// ✅ Delete Resume (Authenticated)
export const deleteResume = async (resumeId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${resumeId}`, { withCredentials: true });

    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to delete resume" };
  }
};