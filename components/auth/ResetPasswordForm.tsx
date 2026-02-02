"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>();

  const [error, setError] = useState("");

  const onSubmit = async (data: ResetPasswordValues) => {
    setError("");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const result = await res.json();
      setError(result.error || "Password reset failed");
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Reset password
        </h1>
        <p className="text-gray-400 text-sm">
          Enter a new password for your account.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          New Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${
              errors.password
                ? "border-red-500/50 ring-2 ring-red-500/10"
                : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            }`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${
              errors.confirmPassword
                ? "border-red-500/50 ring-2 ring-red-500/10"
                : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            }`}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-400 mt-1">
            {errors.confirmPassword.message}
          </p>
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
        {isSubmitting ? "Resetting password..." : "Reset password"}
      </button>
    </form>
  );
}
