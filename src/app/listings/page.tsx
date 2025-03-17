"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddJobListingModal from "@/components/AddJobsModal";
import JobListings from "@/components/JobListings";
import { addMultipleJobs, getRemoteRocketshipJobs } from "@/api-routes/job_routes";
import { FiPlus } from "react-icons/fi";
import { MdAssignment } from 'react-icons/md';
import JobApplicationModal from "@/components/JobApplicationModal";

const ListingsPage = () => {
  const [error, setError] = useState("");
  const [listingsUpdated, setListingsUpdated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState([]);

  // ✅ Handle Job Submission from Modal Filters
  const handleAddJobs = async (filters) => {
    try {
      console.log("🚀 Submitting Filters:", filters);
  
      // ✅ Fetch jobs from Remote RocketShip API
      const fetchResponse = await getRemoteRocketshipJobs({
        seniorityFilters: filters.seniority,
        locationFilters: filters.location,
        jobTitleFilters: filters.jobTitle,
        auth_token: filters.token,
      });
  
      console.log("🌍 Fetched Jobs Response:", fetchResponse);
  
      if (!fetchResponse.success) {
        throw new Error(fetchResponse.message);
      }
  
      // ✅ Ensure correct format before sending
      const formattedJobs = fetchResponse.data.map((job) => ({
        job_title: job.job_title || "Unknown Title",
        company: job.company || "Unknown Company",
        job_url: job.job_url || "",
      }));
  
      if (!Array.isArray(formattedJobs)) {
        throw new Error("Formatted jobs must be an array");
      }
  
      console.log("✅ Jobs Ready to be Sent (Final Check):", JSON.stringify({ jobs: formattedJobs }, null, 2));
  
      // ✅ Send jobs to backend
      const addResponse = await addMultipleJobs(formattedJobs);
  
      console.log("📩 Add Jobs Response:", addResponse);
  
      if (!addResponse.success) {
        console.error("❌ Backend Error (Final Check):", addResponse.message);
        throw new Error(addResponse.message);
      }
  
      setShowModal(false);
      setListingsUpdated(true);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Failed to fetch or add jobs.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="w-[350px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto" style={{ flexGrow: 1, minHeight: "100vh" }}>
        <Header title="Your Job Listings" />

        {/* ✅ Buttons Container */}
        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-2 text-black text-2xl font-bold hover:text-gray-700 transition"
            onClick={() => setShowModal(true)}
          >
            <FiPlus size={25} />
            <h3>Add Job Listings</h3>
          </button>

          <button
            className="flex items-center gap-4 px-6 py-3 bg-[#D90824] text-[#222222] font-bold rounded-md hover:bg-red-700 transition"
            onClick={() => setShowApplyModal(true)}
          >
            <MdAssignment size={24} className="text-[#222222]" />
            Apply
          </button>
        </div>

        {/* ✅ Show error messages if any */}
        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}

        {/* ✅ Render fetched jobs for debugging */}
        {fetchedJobs.length > 0 && (
          <div className="bg-gray-100 p-4 rounded mt-4">
            <h3 className="font-bold">Fetched Jobs (Debugging):</h3>
            <pre className="text-sm overflow-x-auto">{JSON.stringify(fetchedJobs, null, 2)}</pre>
          </div>
        )}

        {/* ✅ Render Job Listings Modal */}
        {showModal && (
          <AddJobListingModal setShowModal={setShowModal} handleAddJobs={handleAddJobs} />
        )}

        {/* Job Listings Table */}
        <JobListings />

        {/* ✅ Render Apply Modal */}
        {showApplyModal && <JobApplicationModal onClose={() => setShowApplyModal(false)} />}
      </div>
    </div>
  );
};

export default ListingsPage;