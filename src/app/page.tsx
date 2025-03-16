import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5]">
      {/* Background Image */}
      <div className="w-[auto] h-[auto]">
        <Image src="/light.png" alt="Background" width={500} height={280} />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}