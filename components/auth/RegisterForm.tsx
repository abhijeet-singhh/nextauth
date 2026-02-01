"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type RegisterFormValues = {
  name?: string;
  email: string;
  password: string;
};

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();
  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

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
          Create account
        </h1>
        <p className="text-gray-400 text-sm">
          Join us and start your journey today.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border border-white/10 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          {...register("name")}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@company.com"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${errors.email ? "border-red-500/50 ring-2 ring-red-500/10" : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${errors.password ? "border-red-500/50 ring-2 ring-red-500/10" : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters required" },
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
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
        {isSubmitting ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-[10px] text-gray-500 text-center px-6 leading-relaxed">
        By signing up, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
