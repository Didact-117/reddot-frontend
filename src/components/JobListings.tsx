"use client";
import { useState, useEffect } from "react";
import { getUserJobListings } from "@/api-routes/job_routes";

const JobListings = () => {
  const [listings, setListings] = useState<
    { job_id: number; job_title: string; company: string; job_url: string; is_applied: boolean; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await getUserJobListings();
      if (response.success) {
        setListings(response.data);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading job listings...</p>;
  }

  if (listings.length === 0) {
    return <p className="text-center text-lg text-gray-600">No job listings found.</p>;
  }

  return (
    <div className="w-full max-w-[1300px] bg-white border border-[#222222] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#222222] text-[#D90824] font-bold text-lg flex">
        <div className="w-1/6 p-4 text-center">Listing ID</div>
        <div className="w-1/6 p-4 text-center">Job Title</div>
        <div className="w-1/6 p-4 text-center">Company</div>
        <div className="w-1/6 p-4 text-center">URL</div>
        <div className="w-1/6 p-4 text-center">Applied?</div>
        <div className="w-1/6 p-4 text-center">Applied On</div>
      </div>

      {/* Table Rows */}
      {listings.map((listing, index) => (
        <div key={listing.job_id} className={`flex text-[#0A210F] ${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"}`}>
          <div className="w-1/6 p-4 text-center font-bold">{listing.job_id}</div>
          <div className="w-1/6 p-4 text-center font-bold">{listing.job_title}</div>
          <div className="w-1/6 p-4 text-center font-bold">{listing.company}</div>
          <div className="w-1/6 p-4 text-center">
            <a href={listing.job_url} target="_blank" rel="noopener noreferrer" className="text-[#D90824] hover:underline">
              Link
            </a>
          </div>
          <div className="w-1/6 p-4 text-center font-bold">{listing.is_applied ? "Yes" : "No"}</div>
          <div className="w-1/6 p-4 text-center font-bold">
            {listing.is_applied ? new Date(listing.created_at).toLocaleDateString() : "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;