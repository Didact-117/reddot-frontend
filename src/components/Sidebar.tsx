"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { FiUser, FiBriefcase, FiClipboard, FiKey, FiLogOut } from "react-icons/fi";
import { logout } from "@/api-routes/user_routes";

const menuItems = [
  { name: "Profile", icon: FiUser, path: "/profile" },
  { name: "Listings", icon: FiBriefcase, path: "/listings" },
  { name: "Applications", icon: FiClipboard, path: "/applications" },
  { name: "API Keys", icon: FiKey, path: "/api-keys" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    router.push(path);
  };


  const handleLogout = async () => {
    try {
      const response = await logout(); // ✅ Call the backend logout API
  
      if (response.success) {
        localStorage.clear(); // ✅ Clear local storage
        router.push("/"); // ✅ Redirect to login/home page
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[300px] bg-[#222222] flex flex-col items-center py-6 gap-10">
      {/* Logo */}
      <div className="w-[250px] h-[140px] flex justify-center">
        <Image src="/dark.png" alt="Logo" width={250} height={140} />
      </div>

      {/* Menu */}
      <nav className="flex flex-col w-full gap-6">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <button
            key={name}
            className={`flex items-center justify-center gap-4 px-6 py-3 w-[90%] text-lg font-bold rounded-md transition 
                ${activeTab === path ? "text-[#D90824]" : "text-[#F5F5F5] hover:text-[#D90824]"}`}
            onClick={() => handleNavigation(path)}
          >
            <Icon size={24} />
            <span className="text-center">{name}</span>
          </button>
        ))}
      </nav>
      {/* Logout Button */}
      <button
        className="mt-auto flex items-center gap-4 px-6 py-3 w-[150px] bg-[#D90824] text-white font-bold rounded-md hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        <FiLogOut size={24} />
        Logout
      </button>
    </div>
  );
}