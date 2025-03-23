import React, { useState } from "react";

const AddJobListingModal = ({ setShowModal, handleAddJobs }) => {
  const seniorityOptions = ["Entry-Level", "Mid", "Junior", "Senior", "Expert"];
  const locationOptions = ["United Arab Emirates", "Saudi Arabia", "Worldwide", "North America", "United States - Remote", "Europe - Remote", "Middle East - Remote"];
  const jobTitleOptions = [
    "2D Artist",
    "3D Artist",
    "Account Executive",
    "Account Manager",
    "Accounting Manager",
    "Accountant",
    "Accounts Payable",
    "Accounts Receivable",
    "Actuary",
    "Administration",
    "Administrative Assistant",
    "Affiliate Manager",
    "AI Engineer",
    "AI Research Scientist",
    "Analyst",
    "Analytics Engineer",
    "Android Engineer",
    "Architect",
    "Art Director",
    "Artificial Intelligence",
    "Attorney",
    "Application Engineer",
    "Auditor",
    "Backend Engineer",
    "Billing Specialist",
    "Blockchain Engineer",
    "Bookkeeping and Clerks",
    "Brand Ambassador",
    "Brand Designer",
    "Brand Manager",
    "Business Development (BDR)",
    "Business Analyst",
    "Business Intelligence Analyst",
    "Business Intelligence Developer",
    "Business Operations & Strategy",
    "Call Center Representative",
    "Chief Marketing Officer",
    "Chief of Staff",
    "Chief Technology Officer (CTO)",
    "Civil Engineer",
    "Clinical Operations",
    "Clinical Research",
    "Content Creator",
    "Content Marketing Manager",
    "Content Manager",
    "Content Writer",
    "Copywriter",
    "Counselor",
    "Crypto",
    "Customer Advocate",
    "Customer Retention Specialist",
    "Customer Success",
    "Customer Support",
    "Data Analyst",
    "Database Administrator",
    "Data Engineer",
    "Data Entry",
    "Data Scientist",
    "DeFi",
    "Designer",
    "Developer Relations (DevRel)",
    "DevOps & Site Reliability Engineer (SRE)",
    "Digital Marketing",
    "Director",
    "E-commerce",
    "Electrical Engineer",
    "Email Marketing Manager",
    "Engineer",
    "Software Engineering Manager",
    "Events",
    "Executive Assistant",
    "Field Service Engineer",
    "Financial Controller",
    "AML and Financial Crime",
    "Financial Planning and Analysis",
    "Full-stack Engineer",
    "Frontend Engineer",
    "Game Engineer",
    "General Counsel",
    "Graphics Designer",
    "Growth Marketing",
    "Hardware Engineer",
    "Human Resources (HR)",
    "Implementation Specialist",
    "Incident Response Analyst",
    "Influencer Marketing",
    "Infrastructure Engineer",
    "Inside Sales",
    "Insurance",
    "iOS Engineer",
    "IT Support",
    "Lead Generation",
    "Legal Assistant",
    "LLM Engineer",
    "Machine Learning Engineer",
    "Manager",
    "Marketing",
    "Marketing Analyst",
    "Marketing Operations",
    "Medical Writer",
    "Mechanical Engineer",
    "Medical Director",
    "Medical Reviewer",
    "Network Engineer",
    "Network Operations",
    "Notary",
    "NLP Engineer",
    "Onboarding Specialist",
    "Operations",
    "Outside Sales",
    "Paralegal",
    "People Operations",
    "Performance Marketing",
    "Platform Engineer",
    "Pre-sales Engineer",
    "Pricing Analyst",
    "Procurement",
    "Producer",
    "Product Adoption Specialist",
    "Product Analyst",
    "Product Designer (UI/UX)",
    "Product Marketing",
    "Product Operations",
    "Product Specialist",
    "Production Engineer",
    "Project Manager",
    "Program Manager",
    "Public Relations (PR)",
    "QA Engineer (Quality Assurance)",
    "QA Automation Engineer",
    "Recruitment",
    "Research Analyst",
    "Research Engineer",
    "Research Scientist",
    "Revenue Operations",
    "Risk",
    "Sales",
    "Sales Development (SDR)",
    "Sales Engineer",
    "Sales Operations",
    "Salesforce Administrator",
    "Salesforce Analyst",
    "Salesforce Consultant",
    "Salesforce Developer",
    "SAP Consultant",
    "Scrum Master + Agile Coach",
    "Software Development Engineer in Test",
    "Security Analyst",
    "Security Engineer",
    "Security Operations",
    "SEO Marketing",
    "Smart Contract Engineer",
    "Social Media Manager",
    "Software Engineer",
    "Solutions Engineer",
    "Supply Chain",
    "Support Engineer",
    "Systems Administrator",
    "Systems Engineer",
    "Tax",
    "Technical Account Manager",
    "Technical Customer Success Manager",
    "Technical Recruiter",
    "Technical Program Manager",
    "Technical Writer",
    "Technical Product Manager (TPM)",
    "Technical Project Manager",
    "Therapist",
    "Threat Intelligence Specialist",
    "Translator",
    "Underwriter",
    "Vice President",
    "Web3"
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