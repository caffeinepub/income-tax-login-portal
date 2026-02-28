import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CaptchaChallenge from '../components/CaptchaChallenge';
import { useLoginUser } from '../hooks/useQueries';
import { hashPassword } from '../utils/validators';
import { setAuthSession } from '../components/AuthGuard';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginUser();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!userId.trim()) newErrors.userId = 'User ID is required';
    if (!password) newErrors.password = 'Password is required';
    if (!captchaValid) newErrors.captcha = 'Please solve the CAPTCHA correctly';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    try {
      const passwordHash = await hashPassword(password);
      await loginMutation.mutateAsync({ userId: userId.trim(), passwordHash });
      setAuthSession(userId.trim());
      toast.success('Login successful! Welcome back.');
      navigate({ to: '/dashboard' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      if (msg.includes('User ID not found')) {
        setSubmitError('User ID not found. Please check your credentials.');
      } else if (msg.includes('Invalid password')) {
        setSubmitError('Invalid password. Please try again.');
      } else {
        setSubmitError('Login failed. Please try again.');
      }
      setCaptchaReset(r => r + 1);
      setCaptchaValid(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Info Panel */}
      <div className="hidden lg:block w-80 shrink-0">
        <div className="bg-navy rounded-lg p-6 text-white space-y-4">
          <h2 className="text-lg font-bold text-saffron border-b border-white/20 pb-2">
            Important Information
          </h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <span className="text-saffron mt-0.5">•</span>
              <span>Use your registered User ID and Password to login.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-saffron mt-0.5">•</span>
              <span>Ensure your PAN is linked with Aadhaar before filing returns.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-saffron mt-0.5">•</span>
              <span>Do not share your login credentials with anyone.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-saffron mt-0.5">•</span>
              <span>For new users, click on "Register" to create your account.</span>
            </li>
          </ul>
        </div>

        <div className="mt-4 bg-saffron/10 border border-saffron/30 rounded-lg p-4">
          <h3 className="text-navy font-semibold text-sm mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/register" className="text-navy/70 hover:text-navy transition-colors">→ New User Registration</Link></li>
            <li><Link to="/reset-password" className="text-navy/70 hover:text-navy transition-colors">→ Forgot Password</Link></li>
          </ul>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-navy/20 shadow-lg">
        <CardHeader className="bg-navy rounded-t-lg pb-4">
          <CardTitle className="text-white text-xl font-bold">Login</CardTitle>
          <CardDescription className="text-white/70">
            Access your Income Tax e-Filing account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          {submitError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User ID */}
            <div className="space-y-1.5">
              <Label htmlFor="userId" className="text-navy font-medium">
                User ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your User ID"
                value={userId}
                onChange={e => { setUserId(e.target.value); setErrors(p => ({ ...p, userId: '' })); }}
                className={`border-navy/30 focus:border-saffron focus:ring-saffron/20 ${errors.userId ? 'border-red-500' : ''}`}
                autoComplete="username"
              />
              {errors.userId && <p className="text-red-600 text-xs">{errors.userId}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-navy font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
                  className={`border-navy/30 focus:border-saffron focus:ring-saffron/20 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
            </div>

            {/* CAPTCHA */}
            <div className="space-y-1.5">
              <Label className="text-navy font-medium">
                CAPTCHA Verification <span className="text-red-500">*</span>
              </Label>
              <CaptchaChallenge onValidChange={setCaptchaValid} reset={captchaReset} />
              {errors.captcha && <p className="text-red-600 text-xs">{errors.captcha}</p>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2.5"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </span>
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="flex items-center justify-between pt-2 border-t border-navy/10 text-sm">
            <Link
              to="/reset-password"
              className="text-navy/70 hover:text-navy hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              className="text-saffron-dark hover:text-saffron font-medium hover:underline transition-colors"
            >
              New User? Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
