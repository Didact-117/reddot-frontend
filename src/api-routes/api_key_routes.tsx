import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api-keys";  // ✅ Adjust as needed

// ✅ Store API Key (Authenticated)
export const storeAPIKey = async (serviceName: string, apiKey: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/store`,
      {
        service_name: serviceName,
        api_key: apiKey,
      },
      { withCredentials: true } // ✅ Ensures cookies are sent for authentication
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to store API key" };
  }
};

// ✅ Get API Keys (Authenticated)
export const getAPIKeys = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });

    return { success: true, data: response.data.api_keys };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to fetch API keys" };
  }
};

// ✅ Delete API Key (Authenticated)
export const deleteAPIKey = async (apiKeyId: number) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/delete`,
      {
        data: { api_key_id: apiKeyId }, // ✅ Send as JSON body
        withCredentials: true,
      }
    );

    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to delete API key" };
  }
};
