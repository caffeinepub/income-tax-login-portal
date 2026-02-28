import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, KeyRound, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useResetPassword } from '../hooks/useQueries';
import { validatePassword, hashPassword } from '../utils/validators';

type Step = 'verify' | 'reset' | 'success';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const resetMutation = useResetPassword();

  const [step, setStep] = useState<Step>('verify');
  const [userId, setUserId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validateVerify = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!userId.trim()) newErrors.userId = 'User ID is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = (): boolean => {
    const newErrors: Record<string, string> = {};
    const pwdErr = validatePassword(newPassword);
    if (pwdErr) newErrors.newPassword = pwdErr;
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateVerify()) return;
    // Move to reset step (actual verification happens on submit)
    setStep('reset');
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateReset()) return;

    try {
      const newPasswordHash = await hashPassword(newPassword);
      await resetMutation.mutateAsync({
        userId: userId.trim(),
        dateOfBirth,
        newPasswordHash,
      });
      setStep('success');
      toast.success('Password reset successfully!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Reset failed';
      if (msg.includes('User ID not found')) {
        setSubmitError('User ID not found. Please check and try again.');
        setStep('verify');
      } else if (msg.includes('Date of Birth does not match')) {
        setSubmitError('Date of Birth does not match our records. Please try again.');
        setStep('verify');
      } else {
        setSubmitError('Password reset failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-navy/20 shadow-lg">
        <CardHeader className="bg-navy rounded-t-lg pb-4">
          <CardTitle className="text-white text-xl font-bold">Reset Password</CardTitle>
          <CardDescription className="text-white/70">
            {step === 'verify' && 'Verify your identity to reset your password'}
            {step === 'reset' && 'Set your new password'}
            {step === 'success' && 'Password reset successful'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {['verify', 'reset', 'success'].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-colors ${
                  step === s
                    ? 'bg-navy border-navy text-white'
                    : ['verify', 'reset', 'success'].indexOf(step) > i
                    ? 'bg-saffron border-saffron text-white'
                    : 'bg-white border-navy/30 text-navy/40'
                }`}>
                  {['verify', 'reset', 'success'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${['verify', 'reset', 'success'].indexOf(step) > i ? 'bg-saffron' : 'bg-navy/20'}`} />}
              </React.Fragment>
            ))}
          </div>

          {submitError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Step 1: Verify Identity */}
          {step === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="userId" className="text-navy font-medium">
                  User ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userId"
                  placeholder="Enter your registered User ID"
                  value={userId}
                  onChange={e => { setUserId(e.target.value); setErrors(p => ({ ...p, userId: '' })); }}
                  className={`border-navy/30 focus:border-saffron ${errors.userId ? 'border-red-500' : ''}`}
                />
                {errors.userId && <p className="text-red-600 text-xs">{errors.userId}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dateOfBirth" className="text-navy font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={e => { setDateOfBirth(e.target.value); setErrors(p => ({ ...p, dateOfBirth: '' })); }}
                  max={new Date().toISOString().split('T')[0]}
                  className={`border-navy/30 focus:border-saffron ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
                {errors.dateOfBirth && <p className="text-red-600 text-xs">{errors.dateOfBirth}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-navy hover:bg-navy/90 text-white font-semibold"
              >
                Verify Identity
              </Button>

              <p className="text-center text-sm text-navy/60">
                <Link to="/login" className="text-navy font-medium hover:underline flex items-center justify-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Back to Login
                </Link>
              </p>
            </form>
          )}

          {/* Step 2: Reset Password */}
          {step === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="bg-saffron/10 border border-saffron/30 rounded p-3 text-sm text-navy/80 mb-2">
                Resetting password for User ID: <strong>{userId}</strong>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="newPassword" className="text-navy font-medium">
                  New Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNew ? 'text' : 'password'}
                    placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value); setErrors(p => ({ ...p, newPassword: '' })); }}
                    className={`border-navy/30 focus:border-saffron pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy"
                    tabIndex={-1}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-600 text-xs">{errors.newPassword}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-navy font-medium">
                  Confirm New Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: '' })); }}
                    className={`border-navy/30 focus:border-saffron pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
                {!errors.confirmPassword && confirmPassword && newPassword === confirmPassword && (
                  <p className="text-green-600 text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-navy/30 text-navy"
                  onClick={() => { setStep('verify'); setSubmitError(''); }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-navy hover:bg-navy/90 text-white font-semibold"
                  disabled={resetMutation.isPending}
                >
                  {resetMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Resetting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      Reset Password
                    </span>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-navy font-bold text-lg">Password Reset Successful!</h3>
              <p className="text-navy/60 text-sm">
                Your password has been updated successfully. You can now login with your new password.
              </p>
              <Button
                className="w-full bg-navy hover:bg-navy/90 text-white font-semibold"
                onClick={() => navigate({ to: '/login' })}
              >
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
