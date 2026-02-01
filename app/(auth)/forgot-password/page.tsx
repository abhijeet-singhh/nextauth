"use client";

import { useState } from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F1A] px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-[#161B26] p-10 rounded-2xl border border-white/10 shadow-2xl">
        {success ? (
          <div className="text-center space-y-4 py-4">
            <h1 className="text-2xl font-bold text-white">Check your email</h1>

            <p className="text-gray-400 leading-relaxed">
              If an account exists for that email, we’ve sent a password reset
              link.
            </p>

            <Link
              href="/login"
              className="inline-block mt-6 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <ForgotPasswordForm onSuccess={() => setSuccess(true)} />
        )}
      </div>

      {!success && (
        <p className="mt-8 text-sm text-gray-500">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:underline transition-all font-medium"
          >
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
