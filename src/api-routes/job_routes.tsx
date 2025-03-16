import axios from "axios";

const API_BASE_URL = "http://localhost:8000/jobs";

// ✅ Add Multiple Job Listings (Authenticated)
export const addMultipleJobs = async (jobs: { job_title: string; company: string; job_url: string }[]) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { jobs },
      { withCredentials: true } // Ensures cookies are sent for authentication
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to add jobs" };
  }
};

// ✅ Get User Job Listings (Authenticated)
export const getUserJobListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });

    return { success: true, data: response.data.jobs };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to retrieve job listings" };
  }
};
