import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RegistrationData {
    contactInfo: string;
    dateOfBirth: string;
    userId: string;
    fullName: string;
    panNumber: string;
    passwordHash: string;
}
export interface PasswordResetData {
    dateOfBirth: string;
    userId: string;
    newPasswordHash: string;
}
export interface UserProfile {
    contactInfo: string;
    dateOfBirth: string;
    userId: string;
    fullName: string;
    panNumber: string;
    passwordHash: string;
}
export interface LoginData {
    userId: string;
    passwordHash: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginUser(loginData: LoginData): Promise<void>;
    logoutUser(): Promise<void>;
    registerUser(registrationData: RegistrationData): Promise<void>;
    resetPassword(resetData: PasswordResetData): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
