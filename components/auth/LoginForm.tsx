"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("root", {
        message: "Invalid email or password",
      });
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Login</h1>
        <p className="text-gray-400 text-sm">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">
          Email
        </label>
        <input
          type="email"
          placeholder="name@company.com"
          className={`w-full bg-[#0B0F1A]/50 px-4 py-3 rounded-lg border text-white transition-all outline-none
            ${errors.email ? "border-red-500/50 ring-2 ring-red-500/10" : "border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`}
          {...register("email", { required: "Required" })}
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
          {...register("password", { required: "Required" })}
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
          <p className="text-sm text-red-400 font-medium">
            {errors.root.message}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
      >
        {isSubmitting ? "Authenticating..." : "Sign In"}
      </button>
    </form>
  );
}
