import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { RegistrationData, LoginData, PasswordResetData, UserProfile } from '../backend';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// ─── Register ────────────────────────────────────────────────────────────────

export function useRegisterUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: RegistrationData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerUser(data);
    },
  });
}

// ─── Login ───────────────────────────────────────────────────────────────────

export function useLoginUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.loginUser(data);
    },
  });
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export function useLogoutUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // logoutUser requires authenticated user; we call it best-effort
      try {
        await actor.logoutUser();
      } catch {
        // ignore auth errors on logout
      }
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

// ─── Reset Password ──────────────────────────────────────────────────────────

export function useResetPassword() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: PasswordResetData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.resetPassword(data);
    },
  });
}
