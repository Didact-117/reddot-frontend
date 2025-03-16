import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteWorkExperience, editWorkExperience } from "@/api-routes/work_experience_routes";
import { useState } from "react";

const WorkExperience = ({
  work_experience_id,
  company,
  role,
  city,
  state,
  country,
  start_date,
  end_date,
  achievements,
  setWorkExperience
}: {
  work_experience_id: number;
  company: string;
  role: string;
  city: string;
  state: string;
  country: string;
  start_date: string;
  end_date: string;
  achievements: string;
  setWorkExperience: (work: any) => void; // To update state after deletion/edit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    company,
    role,
    city,
    state,
    country,
    start_date,
    end_date,
    achievements,
  });

  // Handle Edit Submit
  const handleEdit = async () => {
    const response = await editWorkExperience(work_experience_id, editedDetails);
    if (response.success) {
      setIsEditing(false);
      setWorkExperience((prev: any) =>
        prev.map((exp: any) =>
          exp.work_experience_id === work_experience_id ? { ...exp, ...editedDetails } : exp
        )
      );
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    const response = await deleteWorkExperience(work_experience_id);
    if (response.success) {
      setWorkExperience((prev: any) => prev.filter((exp: any) => exp.work_experience_id !== work_experience_id));
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#222222] border-2 border-[#D90824] rounded-lg p-5 w-full max-w-[800px]">
      
      {/* Company Name */}
      <div className="flex justify-between items-center w-full bg-[#F5F5F5] border border-[#D90824] rounded-md px-4 py-2 mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editedDetails.company}
            onChange={(e) => setEditedDetails({ ...editedDetails, company: e.target.value })}
            className="w-full p-2 text-black bg-white border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-[#222222] font-bold text-lg">{company}</span>
        )}
        <button onClick={() => setIsEditing(!isEditing)} className="text-[#D90824] hover:text-[#ff4757]">
          <FiEdit size={20} />
        </button>
      </div>

      {/* Role */}
      <div className="flex justify-between items-center w-full bg-[#F5F5F5] border border-[#D90824] rounded-md px-4 py-2 mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editedDetails.role}
            onChange={(e) => setEditedDetails({ ...editedDetails, role: e.target.value })}
            className="w-full p-2 text-black bg-white border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-[#222222] font-bold text-lg">{role}</span>
        )}
      </div>

      {/* Start Date & End Date */}
      <div className="flex flex-col sm:flex-row justify-between w-full">
        <div className="flex justify-between items-center w-full bg-[#F5F5F5] border border-[#D90824] rounded-md px-4 py-2 mb-2 sm:w-[49%]">
          {isEditing ? (
            <input
              type="date"
              value={editedDetails.start_date}
              onChange={(e) => setEditedDetails({ ...editedDetails, start_date: e.target.value })}
              className="w-full p-2 text-black bg-white border border-gray-300 rounded-md"
            />
          ) : (
            <span className="text-[#222222] font-bold text-lg">Start: {start_date}</span>
          )}
        </div>

        <div className="flex justify-between items-center w-full bg-[#F5F5F5] border border-[#D90824] rounded-md px-4 py-2 mb-2 sm:w-[49%]">
          {isEditing ? (
            <input
              type="date"
              value={editedDetails.end_date}
              onChange={(e) => setEditedDetails({ ...editedDetails, end_date: e.target.value })}
              className="w-full p-2 text-black bg-white border border-gray-300 rounded-md"
            />
          ) : (
            <span className="text-[#222222] font-bold text-lg">End: {end_date}</span>
          )}
        </div>
      </div>

      {/* Work Details */}
      <div className="flex justify-between items-start w-full bg-[#F5F5F5] border border-[#D90824] rounded-md px-4 py-3 min-h-[100px]">
        {isEditing ? (
          <textarea
            value={editedDetails.achievements}
            onChange={(e) => setEditedDetails({ ...editedDetails, achievements: e.target.value })}
            className="w-full p-2 text-black bg-white border border-gray-300 rounded-md"
          />
        ) : (
          <span className="text-[#222222] font-bold text-lg">{achievements}</span>
        )}
      </div>

      {/* Action Buttons */}
      {isEditing ? (
        <button onClick={handleEdit} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Save
        </button>
      ) : (
        <button onClick={handleDelete} className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
          <FiTrash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default WorkExperience;