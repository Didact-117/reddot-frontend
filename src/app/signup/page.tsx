import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] py-10">
      {/* Scrollable Container */}
      <div className="w-full flex flex-col items-center overflow-y-auto">
        <SignupForm />
      </div>
    </div>
  );
}