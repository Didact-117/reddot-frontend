"use client";
import { useEffect, useState } from "react";
import { getUserResumes } from "@/api-routes/resume_routes";
import { generateAIResponse, applyToJobs } from "@/api-routes/application_routes";

interface JobApplicationModalProps {
  onClose: () => void;
}

export default function JobApplicationModal({ onClose }: JobApplicationModalProps) {
  const [resumes, setResumes] = useState<{ resume_id: number; resume_name: string }[]>([]);
  const [selectedResume, setSelectedResume] = useState<number | null>(null);
  const [maxApplications, setMaxApplications] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [urlsWithFields, setUrlsWithFields] = useState<any[]>([]);

  // ✅ Fetch user resumes on modal open
  useEffect(() => {
    const fetchResumes = async () => {
      const response = await getUserResumes();
      if (response.success) {
        setResumes(response.data);
        if (response.data.length > 0) {
          setSelectedResume(response.data[0].resume_id); // Select first resume by default
        }
      }
    };

    fetchResumes();
  }, []);

  // ✅ Handle AI response generation
  const handleGenerateResponse = async () => {
    if (!selectedResume) {
      alert("Please select a resume.");
      return;
    }
  
    setLoading(true);
    setStatusMessage("Generating responses...");
  
    try {
      const response = await generateAIResponse(selectedResume, maxApplications);
  
      if (response.success) {
        console.log("AI Response Received:", response.data);
  
        // ✅ SAFE EXTRACTION - Avoid crashing if fields are missing
        const extractedUrlsWithFields = Object.entries(response.data.job_listings)
          .map(([url, jobData]: any) => {
            if (!jobData || !jobData.ai_generated_fields) {
              console.warn(`[WARNING] No AI-generated fields for: ${url}`);
              return null; // 🚀 Skip invalid job listings
            }
  
            return {
              url,
              fields: jobData.ai_generated_fields.fields || [], // ✅ Default to empty array
            };
          })
          .filter((job) => job !== null); // ✅ Remove `null` values from the array
  
        if (extractedUrlsWithFields.length === 0) {
          setStatusMessage("No valid job listings found.");
          setLoading(false);
          return;
        }
  
        setUrlsWithFields(extractedUrlsWithFields);
        setStatusMessage("Now opening browser...");
  
        // ✅ Call apply function
        await applyToJobs(extractedUrlsWithFields);
  
        // ✅ Close modal after applying
        onClose();
        window.location.reload();
      } else {
        setStatusMessage("Failed to generate responses.");
      }
    } catch (error) {
      console.error("Error generating responses:", error);
      setStatusMessage("Error generating responses.");
    }
  
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Apply to Jobs</h2>

        {/* Resume Selection */}
        <label className="block text-sm font-medium">Select Resume:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedResume || ""}
          onChange={(e) => setSelectedResume(Number(e.target.value))}
        >
          {resumes.map((resume) => (
            <option key={resume.resume_id} value={resume.resume_id}>
              {resume.resume_name}
            </option>
          ))}
        </select>

        {/* Max Applications Input */}
        <label className="block text-sm font-medium mt-3">Max Applications:</label>
        <input
          type="number"
          className="w-full p-2 border rounded-md"
          value={maxApplications}
          onChange={(e) => setMaxApplications(Number(e.target.value))}
        />

        {/* Status Message */}
        {statusMessage && <p className="mt-3 text-sm text-gray-700">{statusMessage}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-[#D90824] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleGenerateResponse}
            disabled={loading}
          >
            {loading ? "Loading..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
