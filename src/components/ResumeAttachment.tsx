import { FiTrash2 } from "react-icons/fi";
import { deleteResume } from "@/api-routes/resume_routes";

const ResumeAttachment = ({ resume, setResumes }: { resume: any; setResumes: Function }) => {
  const handleDelete = async () => {
    const response = await deleteResume(resume.resume_id);
    if (response.success) {
      setResumes((prevResumes: any[]) => prevResumes.filter((r) => r.resume_id !== resume.resume_id)); // ✅ Remove from UI
    } else {
      alert(response.message); // ✅ Show error message if delete fails
    }
  };

  return (
    <div className="flex items-center justify-between bg-[#222222] border border-[#D90824] rounded-md px-4 py-2 w-full max-w-[300px]">
      {/* File Title */}
      <span className="text-[#F5F5F5] font-bold text-sm truncate">{resume.resume_name}</span>

      {/* Delete Button */}
      <button className="text-[#D90824] hover:text-[#ff4757]" onClick={handleDelete}>
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default ResumeAttachment;