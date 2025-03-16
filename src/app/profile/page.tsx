"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProfileInfo from "@/components/ProfileInfo";
import ResumeAttachment from "@/components/ResumeAttachment";
import WorkExperience from "@/components/WorkExperience";
import { getUserWorkExperience, addWorkExperience } from "@/api-routes/work_experience_routes";
import { getUserResumes, storeResume } from "@/api-routes/resume_routes";
import { FiFile, FiFolder, FiPaperclip, FiPlus } from "react-icons/fi";

const ProfilePage = () => {
  const [workExperience, setWorkExperience] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [manualPath, setManualPath] = useState("");

  // Work Experience State
  const [jobData, setJobData] = useState({
    company: "",
    role: "",
    city: "",
    state: "",
    country: "",
    start_date: "",
    end_date: "",
    achievements: "",
  });

  useEffect(() => {
    const fetchWorkExperience = async () => {
      const response = await getUserWorkExperience();
      if (response.success) setWorkExperience(response.data);
    };

    const fetchResumes = async () => {
      const response = await getUserResumes();
      if (response.success) setResumes(response.data);
    };

    fetchWorkExperience();
    fetchResumes();
  }, []);

  // ✅ Handle Resume Submission
  const handleAddResume = async () => {
    if (!manualPath.trim()) {
      return alert("Please enter the full file path.");
    }
  
    const resumeName = manualPath.split("/").pop();
  
    const response = await storeResume(manualPath.trim(), resumeName, false);
  
    if (response.success) {
      setResumes((prev) => [...prev, { resume_id: response.data.resume_id, resume_name: resumeName }]);
      setShowResumeModal(false);
      setManualPath("");
    } else {
      alert(response.message);
    }
  };

  // ✅ Handle Job Form Input Change
  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Job Submission
  const handleAddJob = async () => {
    const { company, role, city, state, country, start_date, end_date, achievements } = jobData;
    if (!company || !role || !start_date || !end_date || !achievements) {
      return alert("Please fill in all required fields.");
    }

    const response = await addWorkExperience(company, role, city, state, country, start_date, end_date, achievements);
    if (response.success) {
      setWorkExperience((prev) => [...prev, { work_experience_id: response.data.work_experience_id, ...jobData }]);
      setShowJobModal(false);
      setJobData({
        company: "",
        role: "",
        city: "",
        state: "",
        country: "",
        start_date: "",
        end_date: "",
        achievements: "",
      });
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="w-[350px] flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto" style={{ flexGrow: 1, minHeight: "100vh" }}>
        <Header title="Your Information" />
        <ProfileInfo />

        {/* Resumes Section */}
        <div className="flex flex-col gap-4">
          <Header title="Resumes" />

          {/* ✅ Add Resume Button */}
          <button 
            className="flex items-center gap-2 text-black text-2xl font-bold hover:text-gray-700 transition"
            onClick={() => setShowResumeModal(true)}
          >
            <FiPaperclip size={25} />
            <h3>Add New Resume</h3>
          </button>

          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <ResumeAttachment key={resume.resume_id} resume={resume} setResumes={setResumes} />
            ))
          ) : (
            <p className="text-gray-600">No resumes found.</p>
          )}
        </div>

        {/* Work Experience Section */}
        <div className="flex flex-col gap-4">
          <Header title="Work Experience" />

          {/* ✅ Add Work Experience Button */}
          <button 
            className="flex items-center gap-2 text-black text-2xl font-bold hover:text-gray-700 transition"
            onClick={() => setShowJobModal(true)}
          >
            <FiPlus size={25} />
            <h3>Add Work Experience</h3>
          </button>

          {workExperience.length > 0 ? (
            workExperience.map((work) => (
              <WorkExperience key={work.work_experience_id} {...work} setWorkExperience={setWorkExperience} />
            ))
          ) : (
            <p className="text-gray-600">No work experience found.</p>
          )}
        </div>
      </div>

      {/* ✅ Resume Upload Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Resume</h2>
            <div className="flex items-center gap-2">
              <FiFolder size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter full file path..."
                value={manualPath}
                onChange={(e) => setManualPath(e.target.value)}
                className="flex-grow border px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowResumeModal(false)}>
                Cancel
              </button>
              <button
                className="bg-[#D90824] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleAddResume}
              >
                Add Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add Work Experience Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[450px]">
            <h2 className="text-lg font-bold mb-4">Add Work Experience</h2>

            {/* Form Inputs */}
            {[
              { label: "Company", name: "company" },
              { label: "Role", name: "role" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Country", name: "country" },
              { label: "Start Date", name: "start_date", type: "date" },
              { label: "End Date", name: "end_date", type: "date" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="mb-4">
                <label className="block text-gray-700 font-bold">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={jobData[name as keyof typeof jobData]}
                  onChange={handleJobChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}

            {/* Achievements */}
            <textarea
              name="achievements"
              placeholder="Achievements..."
              value={jobData.achievements}
              onChange={handleJobChange}
              className="w-full p-2 border rounded-md mb-4"
            />

            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowJobModal(false)}>
                Cancel
              </button>
              <button
                className="bg-[#D90824] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleAddJob}
              >
                Add Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;