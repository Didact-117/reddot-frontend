"use client";

import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiX, FiPlus } from "react-icons/fi"; // Icons for visibility toggle & delete
import { getAPIKeys, storeAPIKey, deleteAPIKey } from "@/api-routes/api_key_routes";

const APIKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [apiKeyId, setApiKeyId] = useState<number | null>(null); // ✅ Store API Key ID
  const [inputValue, setInputValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch API Key on component mount
  useEffect(() => {
    const fetchKeys = async () => {
      const response = await getAPIKeys();
      if (response.success && response.data.length > 0) {
        const key = response.data[0]; // ✅ Assuming one key per user
        setApiKey(key.service_name); // ✅ We only show the service name
        setApiKeyId(key.api_key_id); // ✅ Store API Key ID for deletion
      }
      setLoading(false);
    };

    fetchKeys();
  }, []);

  // ✅ Handle API Key Storage
  const handleSave = async () => {
    if (inputValue.trim() === "") return alert("Please enter an API key.");

    const response = await storeAPIKey("OpenAI", inputValue);
    if (response.success) {
      setApiKey("OpenAI");
      setApiKeyId(response.data.api_key_id);
      setInputValue("");
    } else {
      alert(response.message);
    }
  };

  // ✅ Handle API Key Deletion
  const handleDelete = async () => {
    if (!apiKeyId) return;

    const response = await deleteAPIKey(apiKeyId);
    if (response.success) {
      setApiKey(null);
      setApiKeyId(null);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[600px] p-5 border-3 border-[#D90824] bg-[#222222] rounded-lg">
      {/* Title */}
      <div className="text-white font-mono font-bold text-lg mb-2">OpenAI API Key:</div>

      {/* Loading State */}
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {/* API Key Display */}
          <div className="flex items-center w-full bg-[#F5F5F5] border border-[#D90824] rounded-md p-2">
            {apiKey ? (
              <span className="flex-1 font-mono text-black text-lg">
                 ***********
              </span>
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your API Key"
                className="flex-1 bg-transparent outline-none font-mono text-lg"
              />
            )}


          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            {!apiKey ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#D90824] text-white font-bold rounded-md hover:bg-[#b5071f]"
              >
                <FiPlus size={18} className="inline-block mr-2" />
                Save API Key
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="text-[#D90824] text-xl hover:text-red-700"
              >
                <FiX size={24} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default APIKey;