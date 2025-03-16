"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import JobListings from "@/components/JobListings";
import { addMultipleJobs } from "@/api-routes/job_routes";
import { FiPlus } from "react-icons/fi";
import { MdWork, MdAssignment } from 'react-icons/md';
import JobApplicationModal from "@/components/JobApplicationModal"; 

const ListingsPage = () => {
  const [jsonInput, setJsonInput] = useState(""); // Stores raw JSON input
  const [error, setError] = useState(""); // Stores validation error
  const [listingsUpdated, setListingsUpdated] = useState(false); // Track if listings need to be refreshed
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false); 

  // ✅ Handle Job Submission
  const handleAddJobs = async () => {
    try {
      const jobs = JSON.parse(jsonInput); // Parse JSON input
      if (!Array.isArray(jobs)) {
        throw new Error("Invalid format: Expected an array of jobs.");
      }

      // ✅ Call API to add jobs
      const response = await addMultipleJobs(jobs);
      if (response.success) {
        setShowModal(false);
        setJsonInput("");
        setListingsUpdated(true); // ✅ Trigger job listings refresh
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Invalid JSON format.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="w-[350px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto" style={{ flexGrow: 1, minHeight: "100vh" }}>
        <Header title="Your Job Listings" />

        {/* ✅ Buttons Container - Placing Buttons Side by Side */}
        <div className="flex items-center gap-6">
          {/* ✅ Add Job Listings Button */}
          <button
            className="flex items-center gap-2 text-black text-2xl font-bold hover:text-gray-700 transition"
            onClick={() => setShowModal(true)}
          >
            <FiPlus size={25} />
            <h3>Add Job Listings</h3>
          </button>

          {/* ✅ Apply Button - Opens JobApplicationModal */}
          <button
            className="flex items-center gap-4 px-6 py-3 bg-[#D90824] text-[#222222] font-bold rounded-md hover:bg-red-700 transition"
            onClick={() => setShowApplyModal(true)}
          >
            <MdAssignment size={24} className="text-[#222222]" />
            Apply
          </button>
        </div>

        {/* ✅ Render Job Listings Modal if showModal is true */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h2 className="text-2xl font-bold mb-4">Add Job Listings</h2>
              <textarea
                className="w-full h-40 border p-2"
                placeholder='Enter job listings as JSON'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#D90824] text-white rounded hover:bg-red-700"
                  onClick={handleAddJobs} // ✅ This will now actually trigger!
                >
                  Add Jobs
                </button>
              </div>
            </div>
          </div>
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