import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import APIKey from "@/components/APIKey";

const APIKeysPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar (Fixed Left) */}
      <div className="w-[350px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div 
        className="flex flex-col gap-10 px-10 py-10 overflow-y-auto"
        style={{
          flexGrow: 1, // Ensures content takes up remaining space
          minHeight: "100vh",
        }}
      >
        {/* Header Component */}
        <Header title="Your API Keys" />

        {/* API Key Component */}
        <APIKey />
      </div>
    </div>
  );
};

export default APIKeysPage;