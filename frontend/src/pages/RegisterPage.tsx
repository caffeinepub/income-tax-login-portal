import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRegisterUser } from '../hooks/useQueries';
import {
  validatePAN,
  validatePassword,
  validateDateOfBirth,
  validateUserId,
  hashPassword,
} from '../utils/validators';

interface FormData {
  fullName: string;
  panNumber: string;
  dateOfBirth: string;
  userId: string;
  password: string;
  confirmPassword: string;
  contactInfo: string;
}

const initialForm: FormData = {
  fullName: '',
  panNumber: '',
  dateOfBirth: '',
  userId: '',
  password: '',
  confirmPassword: '',
  contactInfo: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();

  const [form, setForm] = useState<FormData>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState('');

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'panNumber' ? e.target.value.toUpperCase() : e.target.value;
    setForm(f => ({ ...f, [field]: value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    const panErr = validatePAN(form.panNumber);
    if (panErr) newErrors.panNumber = panErr;
    const dobErr = validateDateOfBirth(form.dateOfBirth);
    if (dobErr) newErrors.dateOfBirth = dobErr;
    const userIdErr = validateUserId(form.userId);
    if (userIdErr) newErrors.userId = userIdErr;
    const pwdErr = validatePassword(form.password);
    if (pwdErr) newErrors.password = pwdErr;
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!form.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactInfo) &&
      !/^[6-9]\d{9}$/.test(form.contactInfo)
    ) {
      newErrors.contactInfo = 'Enter a valid email or 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    try {
      const passwordHash = await hashPassword(form.password);
      await registerMutation.mutateAsync({
        fullName: form.fullName.trim(),
        panNumber: form.panNumber.toUpperCase(),
        dateOfBirth: form.dateOfBirth,
        userId: form.userId.trim(),
        passwordHash,
        contactInfo: form.contactInfo.trim(),
      });
      toast.success('Registration successful! Please login with your credentials.');
      navigate({ to: '/login' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      if (msg.includes('User ID already exists')) {
        setErrors(p => ({ ...p, userId: 'This User ID is already taken. Please choose another.' }));
      } else {
        setSubmitError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-navy/20 shadow-lg">
        <CardHeader className="bg-navy rounded-t-lg pb-4">
          <CardTitle className="text-white text-xl font-bold">New User Registration</CardTitle>
          <CardDescription className="text-white/70">
            Create your Income Tax e-Filing account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {submitError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm mb-4">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Details Section */}
            <div className="border-l-4 border-saffron pl-3 mb-2">
              <h3 className="text-navy font-semibold text-sm uppercase tracking-wide">Personal Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="fullName" className="text-navy font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="As per PAN card"
                  value={form.fullName}
                  onChange={update('fullName')}
                  className={`border-navy/30 focus:border-saffron ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && <p className="text-red-600 text-xs">{errors.fullName}</p>}
              </div>

              {/* PAN Number */}
              <div className="space-y-1.5">
                <Label htmlFor="panNumber" className="text-navy font-medium">
                  PAN Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="panNumber"
                  placeholder="e.g. ABCDE1234F"
                  value={form.panNumber}
                  onChange={update('panNumber')}
                  maxLength={10}
                  className={`border-navy/30 focus:border-saffron font-mono uppercase ${errors.panNumber ? 'border-red-500' : ''}`}
                />
                {errors.panNumber && <p className="text-red-600 text-xs">{errors.panNumber}</p>}
                {!errors.panNumber && form.panNumber.length === 10 && (
                  <p className="text-green-600 text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Valid PAN format
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <Label htmlFor="dateOfBirth" className="text-navy font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={update('dateOfBirth')}
                  max={new Date().toISOString().split('T')[0]}
                  className={`border-navy/30 focus:border-saffron ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
                {errors.dateOfBirth && <p className="text-red-600 text-xs">{errors.dateOfBirth}</p>}
              </div>
            </div>

            {/* Account Details Section */}
            <div className="border-l-4 border-saffron pl-3 mt-4 mb-2">
              <h3 className="text-navy font-semibold text-sm uppercase tracking-wide">Account Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User ID */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="userId" className="text-navy font-medium">
                  User ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userId"
                  placeholder="Choose a unique User ID (4-20 chars)"
                  value={form.userId}
                  onChange={update('userId')}
                  className={`border-navy/30 focus:border-saffron ${errors.userId ? 'border-red-500' : ''}`}
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
                    placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
                    value={form.password}
                    onChange={update('password')}
                    className={`border-navy/30 focus:border-saffron pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/50 hover:text-navy"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-navy font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
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
                {!errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                  <p className="text-green-600 text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="contactInfo" className="text-navy font-medium">
                  Mobile Number / Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactInfo"
                  placeholder="Enter mobile number or email address"
                  value={form.contactInfo}
                  onChange={update('contactInfo')}
                  className={`border-navy/30 focus:border-saffron ${errors.contactInfo ? 'border-red-500' : ''}`}
                />
                {errors.contactInfo && <p className="text-red-600 text-xs">{errors.contactInfo}</p>}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2.5"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-navy/60">
                Already have an account?{' '}
                <Link to="/login" className="text-navy font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
