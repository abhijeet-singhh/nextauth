import LoginForm from "@/components/auth/LoginForm";
import OAuthButtons from "@/components/auth/OAuthButtons";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F1A] px-4">
      {/* Background Glow Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-md bg-[#161B26] p-10 rounded-2xl border border-white/10 shadow-2xl">
        <LoginForm />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-[#161B26] px-3 text-gray-500 font-medium">
              Alternative
            </span>
          </div>
        </div>

        <OAuthButtons />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="#" className="text-blue-400 hover:underline transition-all">
          Sign up
        </a>
      </p>
    </div>
  );
}
