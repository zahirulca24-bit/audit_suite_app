import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SignInCardProps {
  onSignInSuccess: (email: string) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
}

export const SignInCard: React.FC<SignInCardProps> = ({
  onSignInSuccess,
  onForgotPassword,
  onCreateAccount,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess(email || 'admin@avenquis.com');
    }, 400);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess('zahirul.ca24@gmail.com');
    }, 400);
  };

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-neutral-100 max-w-[430px] w-full">
      {/* Canonical Brand Header for Login (Size LG: ~48-64px mark) */}
      <div className="mb-6">
        <BrandLogo variant="light" showWordmark descriptor="Firm OS" size="lg" />
      </div>

      {/* Title & Subtitle */}
      <h2 className="font-serif text-3xl sm:text-[34px] font-normal text-neutral-900 tracking-tight mb-1.5">
        Welcome Back
      </h2>
      <p className="text-xs text-neutral-500 mb-7">
        Sign in to continue to your workspace.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">
            Email Address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-200/90 bg-white pl-10 pr-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#0D7A6F] focus:ring-1 focus:ring-[#0D7A6F] transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 mb-1.5">
            Password
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-neutral-200/90 bg-white pl-10 pr-10 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#0D7A6F] focus:ring-1 focus:ring-[#0D7A6F] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#0B332A] accent-[#0B332A] border-neutral-300 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-neutral-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-[#0D7A6F] hover:text-[#09574E] font-medium transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-[#0B332A] hover:bg-[#07241D] text-white py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer disabled:opacity-75"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative py-2.5 flex items-center justify-center">
          <div className="w-full border-t border-neutral-200" />
          <span className="absolute bg-white px-3 text-[11px] text-neutral-400">
            or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-4 text-xs font-medium text-neutral-700 transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
        >
          {/* Google G SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-neutral-500">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={onCreateAccount}
            className="text-[#0B332A] hover:underline font-medium cursor-pointer"
          >
            Create one
          </button>
        </div>
      </form>
    </div>
  );
};
