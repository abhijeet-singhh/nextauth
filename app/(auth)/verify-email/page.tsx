"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Verification failed");
        }

        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] px-4">
      <div className="w-full max-w-md bg-[#161B26] p-10 rounded-2xl border border-white/10 shadow-2xl text-center space-y-4">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold text-white">
              Verifying your email…
            </h1>
            <p className="text-gray-400 text-sm">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
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

            <h1 className="text-2xl font-bold text-white">Email verified</h1>

            <p className="text-gray-400 text-sm">
              Your email has been verified. You can now log in.
            </p>

            <Link
              href="/login"
              className="inline-block mt-4 text-blue-400 hover:underline font-medium"
            >
              Go to login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-white">
              Verification failed
            </h1>

            <p className="text-gray-400 text-sm">{message}</p>

            <Link
              href="/login"
              className="inline-block mt-4 text-blue-400 hover:underline font-medium"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
