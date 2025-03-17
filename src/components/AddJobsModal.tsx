import React, { useState } from "react";

const AddJobListingModal = ({ setShowModal, handleAddJobs }) => {
  const seniorityOptions = ["Entry-Level", "Mid", "Junior", "Senior", "Expert"];
  const locationOptions = ["United Arab Emirates", "Saudi Arabia", "Worldwide", "North America"];
  const jobTitleOptions = [
    "Product Manager", "Technical Product Manager", "Technical Project Manager", 
    "Technical Program Manager", "Crypto", "Database Administrator", "Data Engineer",
    "Data Scientist", "Growth Marketing", "Marketing Analyst", "UX Researcher", "Web Designer"
  ];

  const [seniority, setSeniority] = useState([]);
  const [location, setLocation] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [token, setToken] = useState("");

  const toggleSelection = (option, setState, state) => {
    setState(state.includes(option) ? state.filter(item => item !== option) : [...state, option]);
  };

  const handleSubmit = () => {
    const jobData = { seniority, location, jobTitle, token };
    handleAddJobs(jobData); // Pass filters to handleAddJobs
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Add Job Filters</h2>

        {/* Seniority Filters */}
        <label className="block font-semibold">Seniority Filters</label>
        <div className="border p-2 rounded bg-gray-100">
          {seniorityOptions.map(option => (
            <button
              key={option}
              className={`px-2 py-1 m-1 text-sm rounded ${
                seniority.includes(option) ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => toggleSelection(option, setSeniority, seniority)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Location Filters */}
        <label className="block font-semibold mt-4">Location Filters</label>
        <div className="border p-2 rounded bg-gray-100">
          {locationOptions.map(option => (
            <button
              key={option}
              className={`px-2 py-1 m-1 text-sm rounded ${
                location.includes(option) ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => toggleSelection(option, setLocation, location)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Job Title Filters */}
        <label className="block font-semibold mt-4">Job Title Filters</label>
        <div className="border p-2 rounded bg-gray-100 max-h-40 overflow-y-auto">
          {jobTitleOptions.map(option => (
            <button
              key={option}
              className={`px-2 py-1 m-1 text-sm rounded ${
                jobTitle.includes(option) ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => toggleSelection(option, setJobTitle, jobTitle)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Token Input */}
        <label className="block font-semibold mt-4">Token</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#D90824] text-white rounded hover:bg-red-700"
            onClick={handleSubmit}
          >
            Add Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobListingModal;