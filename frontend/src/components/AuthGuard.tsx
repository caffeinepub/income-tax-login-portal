import React from 'react';
import { Navigate } from '@tanstack/react-router';

interface AuthGuardProps {
  children: React.ReactNode;
}

// Auth state is stored in sessionStorage after successful login
export function isAuthenticated(): boolean {
  return sessionStorage.getItem('itd_auth_userId') !== null;
}

export function getAuthUserId(): string | null {
  return sessionStorage.getItem('itd_auth_userId');
}

export function setAuthSession(userId: string): void {
  sessionStorage.setItem('itd_auth_userId', userId);
}

export function clearAuthSession(): void {
  sessionStorage.removeItem('itd_auth_userId');
}

export default function AuthGuard({ children }: AuthGuardProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
