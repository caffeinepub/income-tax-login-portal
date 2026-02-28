export function validatePAN(pan: string): string | null {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!pan) return 'PAN number is required';
  if (!panRegex.test(pan.toUpperCase())) {
    return 'Invalid PAN format. Expected: ABCDE1234F';
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
}

export function validateMobile(mobile: string): string | null {
  if (!mobile) return 'Mobile number is required';
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) return 'Invalid mobile number (10 digits, starting with 6-9)';
  return null;
}

export function validateDateOfBirth(dob: string): string | null {
  if (!dob) return 'Date of birth is required';
  const date = new Date(dob);
  if (isNaN(date.getTime())) return 'Invalid date';
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  if (age < 18) return 'You must be at least 18 years old';
  if (age > 120) return 'Invalid date of birth';
  return null;
}

export function validateUserId(userId: string): string | null {
  if (!userId) return 'User ID is required';
  if (userId.length < 4) return 'User ID must be at least 4 characters';
  if (userId.length > 20) return 'User ID must be at most 20 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(userId)) return 'User ID can only contain letters, numbers, and underscores';
  return null;
}

// Simple hash function for passwords (client-side only)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'itd_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
