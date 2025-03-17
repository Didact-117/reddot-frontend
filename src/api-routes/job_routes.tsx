import axios from "axios";

const API_BASE_URL = "http://localhost:8000/jobs";

// ✅ Add Multiple Job Listings (Authenticated)
export const addMultipleJobs = async (jobs: { job_title: string; company: string; job_url: string }[]) => {
  try {
    // ✅ Debug: Log before sending
    console.log("🚀 Sending to Backend (Ensuring JSON is Valid):", JSON.stringify({ jobs }, null, 2));

    // ✅ Ensure `jobs` is a valid array
    if (!Array.isArray(jobs)) {
      throw new Error("Jobs must be an array, received: " + typeof jobs);
    }

    // ✅ Ensure each job has required fields
    jobs.forEach((job, index) => {
      if (!job.job_title || !job.company || !job.job_url) {
        throw new Error(`Job at index ${index} is missing fields: ${JSON.stringify(job)}`);
      }
    });

    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { jobs },  // Ensure `jobs` is wrapped in an object
      { withCredentials: true }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Backend Error (422 Fix Debugging):", error.response?.data || error.message);
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

// ✅ Fetch Jobs from Remote RocketShip API
export const getRemoteRocketshipJobs = async (queryParams: {
  seniorityFilters?: string[];
  locationFilters?: string[];
  locationUSStatesFilters?: string[];
  techStackFilters?: string[];
  jobTitleFilters?: string[];
  keywordFilters?: string[];
  excludedKeywordFilters?: string[];
  companySizeFilters?: string[];
  employmentTypeFilters?: string[];
  visaFilter?: string | null;
  minSalaryFilter?: number | null;
  showJobsWithoutSalaryWithMinSalaryFilter?: boolean;
  degreeRequiredFilter?: string | null;
  industriesFilters?: string[];
  companyIdFilter?: string | null;
  itemsPerPage?: number;
  sortBy?: string;
  showOnlySavedJobs?: boolean;
  showOnlyAppliedJobs?: boolean;
  showOnlyHiddenJobs?: boolean;
  savedJobOpeningIds?: string[];
  appliedJobOpeningIds?: string[];
  hiddenJobOpeningIds?: string[];
  numberOfJobsHiddenInThisSession?: number;
  auth_token: string; // Required authentication token
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/remote-rocketship-jobs`,
      queryParams,
      { withCredentials: true } // Ensures authentication cookies are sent
    );

    return { success: true, data: response.data.jobs };
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || "Failed to fetch jobs" };
  }
};