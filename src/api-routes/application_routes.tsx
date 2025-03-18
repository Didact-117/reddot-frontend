import axios from "axios";

const API_BASE_URL = "http://localhost:8000/applications";

export const applyToJobs = async (urlsWithFields: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/apply`,
      { urls_with_fields: urlsWithFields },
      { withCredentials: true }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to apply to jobs" };
  }
};


export const generateAIResponse = async (resumeId: number, maxApplications: number, isApplied: boolean = false) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-response`,
      {
        resume_id: resumeId,
        max_applications: maxApplications,
        is_applied: isApplied
      },
      { withCredentials: true }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to generate response" };
  }
};



// ✅ Get User Job Applications (Authenticated)
export const getUserJobApplications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to retrieve job applications" };
  }
};