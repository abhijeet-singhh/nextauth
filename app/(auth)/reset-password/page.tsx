"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
        <div className="bg-[#161B26] p-10 rounded-2xl border border-white/10 text-center">
          <h1 className="text-2xl font-bold text-white">Invalid reset link</h1>
          <p className="text-gray-400 mt-2">
            This password reset link is invalid or expired.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block mt-4 text-blue-400 hover:underline"
          >
            Request a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F1A] px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#161B26] p-10 rounded-2xl border border-white/10 shadow-2xl">
        {success ? (
          <div className="text-center space-y-4 py-4">
            <h1 className="text-2xl font-bold text-white">Password updated</h1>

            <p className="text-gray-400">
              Your password has been reset successfully.
            </p>

            <Link
              href="/login"
              className="inline-block mt-6 text-blue-400 hover:underline font-medium"
            >
              Go to login
            </Link>
          </div>
        ) : (
          <ResetPasswordForm token={token} onSuccess={() => setSuccess(true)} />
        )}
      </div>
    </div>
  );
}
