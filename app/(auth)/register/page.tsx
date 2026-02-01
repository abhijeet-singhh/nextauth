"use client";

import { useState } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
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
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white">Check your email</h1>

            <p className="text-gray-400 leading-relaxed">
              We’ve sent a verification link to your inbox. Please verify your
              email before logging in.
            </p>

            <Link
              href="/login"
              className="inline-block mt-6 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <RegisterForm onSuccess={() => setSuccess(true)} />
        )}
      </div>

      {!success && (
        <p className="mt-8 text-sm text-gray-500">
          Already have an account?{" "}
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
