"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type ForgotPasswordValues = {
  email: string;
};

export default function ForgotPasswordForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>();

  const [error, setError] = useState("");

  const onSubmit = async (data: ForgotPasswordValues) => {
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // 🔐 Always treat as success (prevent enumeration)
    if (!res.ok) {
      const result = await res.json();
      setError(result.error || "Something went wrong");
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Forgot password
        </h1>
        <p className="text-gray-400 text-sm">
          Enter your email and we’ll send you a reset link.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@company.com"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${
              errors.email
                ? "border-red-500/50 ring-2 ring-red-500/10"
                : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            }`}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
          <p className="text-sm text-red-400 font-medium">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
      >
        {isSubmitting ? "Sending reset link..." : "Send reset link"}
      </button>
    </form>
  );
}
