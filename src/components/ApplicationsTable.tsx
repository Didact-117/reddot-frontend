"use client";
import { useState, useEffect } from "react";
import { getUserJobApplications } from "@/api-routes/application_routes";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await getUserJobApplications();
      if (response.success) {
        setApplications(response.data.applications);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="w-full max-w-[1300px] bg-white border border-[#222222] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#222222] text-[#D90824] font-bold text-lg flex">
        <div className="w-1/5 p-4 text-center">Application ID</div>
        <div className="w-1/5 p-4 text-center">Job Title</div>
        <div className="w-1/5 p-4 text-center">Company</div>
        <div className="w-1/5 p-4 text-center">Resume</div>
        <div className="w-1/5 p-4 text-center">Applied On</div>
      </div>

      {/* Table Rows */}
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <div
            key={application.application_id}
            className={`flex text-[#0A210F] ${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"}`}
          >
            <div className="w-1/5 p-4 text-center font-bold">{application.application_id}</div>
            <div className="w-1/5 p-4 text-center font-bold">{application.job_title}</div>
            <div className="w-1/5 p-4 text-center font-bold">{application.company}</div>
            <div className="w-1/5 p-4 text-center">{application.resume_title} </div>
            <div className="w-1/5 p-4 text-center font-bold">
              {new Date(application.applied_at).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center p-4">No job applications found.</p>
      )}
    </div>
  );
};

export default ApplicationsTable;