import axios from "axios";

const API_BASE_URL = "http://localhost:8000/work-experience";

// ✅ Add Work Experience (Authenticated)
export const addWorkExperience = async (
  company: string,
  role: string,
  city: string,
  state: string,
  country: string,
  startDate: string,
  endDate: string,
  achievements: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        company,
        role,
        city,
        state,
        country,
        start_date: startDate,
        end_date: endDate,
        achievements,
      },
      { withCredentials: true } // Ensures cookies are sent for authentication
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to add work experience" };
  }
};

// ✅ Get User Work Experience (Authenticated)
export const getUserWorkExperience = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to retrieve work experience" };
  }
};

// ✅ Edit Work Experience (Authenticated)
export const editWorkExperience = async (workExperienceId: number, updates: Record<string, string>) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/edit`,
      {
        work_experience_id: workExperienceId,
        updates,
      },
      { withCredentials: true }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to update work experience" };
  }
};


export const deleteWorkExperience = async (workExperienceId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
      params: { work_experience_id: workExperienceId }, // ✅ Sending as a query parameter
      withCredentials: true,
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to delete work experience" };
  }
};