"use client";
import { useState, useEffect } from "react";
import { getProfile, updateUserProfile } from "@/api-routes/user_routes";
import { FiEdit2, FiSave } from "react-icons/fi";

const ProfileInfo = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile.success) {
        setUserData(profile.data);
        setFormData(profile.data); // Initialize form data with user info
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Profile Update
  const handleUpdateProfile = async () => {
    const { created_at, updated_at, email, user_id, ...updates } = formData; // ✅ Exclude non-editable fields
  
    const response = await updateUserProfile(updates);
    if (response.success) {
      setUserData({ ...userData, ...updates }); // ✅ Update local state
      setIsEditing(false);
    } else {
      alert(response.message);
    }
  };

  // ✅ Handle Password Change
  const handlePasswordChange = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      return alert("Please enter both old and new passwords.");
    }

    const response = await updateUserProfile({}, passwordData.oldPassword, passwordData.newPassword);
    if (response.success) {
      alert("Password updated successfully.");
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: "", newPassword: "" });
    } else {
      alert(response.message);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!userData) return <p className="text-center text-lg text-red-500">Failed to load profile.</p>;

  const fields = [
    { label: "First Name", name: "fname" },
    { label: "Last Name", name: "lname" },
    { label: "Email", name: "email", readOnly: true },
    { label: "Phone", name: "phone" },
    { label: "LinkedIn", name: "linkedin_url" },
    { label: "Address", name: "address" },
    { label: "State/Province", name: "state" },
    { label: "Country", name: "country" },
  ];

  return (
    <div className="w-full max-w-[800px] bg-[#222222] border-4 border-[#D90824] rounded-lg p-6 flex flex-col gap-6">

        <div className="flex justify-end items-center gap-4 mt-4 ">
            {/* Password Edit Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 border border-[#D90824] text-[#D90824] font-bold rounded-md hover:text-white hover:bg-[#D90824] transition"
            onClick={() => setShowPasswordModal(true)}
          >
            <FiEdit2 size={18} />
            Change Password
          </button>

          {/* Save / Edit Toggle Button */}
          <button
            className={`flex items-center gap-2 px-4 py-2 border border-[#D90824] font-bold rounded-md transition ${
              isEditing 
                ? "text-[#D90824] bg-white hover:bg-gray-200"  // No background when editing
                : "bg-[#D90824] text-white hover:bg-red-700"  // Regular button style
            }`}
            onClick={() => (isEditing ? handleUpdateProfile() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <FiSave size={18} />
                Save Changes
              </>
            ) : (
              <>
                <FiEdit2 size={18} />
                Edit Profile
              </>
            )}
          </button>
        </div>

      {fields.map(({ label, name, readOnly }, index) => (
        <div key={index} className="flex justify-between items-center w-full p-4 rounded-md">
          {/* Field Title */}
          <span className="text-[#FFFFFF] font-bold text-lg w-1/3 text-right pr-4">{label}:</span>

          {/* Editable Input */}
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            readOnly={readOnly || !isEditing}
            className={`w-2/3 bg-[#F5F5F5] text-[#222222] border border-[#D90824] rounded-md px-3 py-2 ${isEditing && !readOnly ? "border-blue-500" : ""}`}
          />
        </div>
      ))}


      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>

            <label className="block text-gray-700 font-bold mb-2">Old Password</label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-gray-700 font-bold mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />

            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button
                className="bg-[#D90824] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;