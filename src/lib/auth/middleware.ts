import { z } from 'zod';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { validateFormCSRF } from './csrf';

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>,
  requireCSRF: boolean = true
) {
  return async (prevState: ActionState, formData: FormData) => {
    // Validate CSRF token for state-changing operations
    if (requireCSRF && !(await validateFormCSRF(formData))) {
      return { error: 'Invalid request. Please try again.' };
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>,
  requireCSRF: boolean = true
) {
  return async (prevState: ActionState, formData: FormData) => {
    const user = await getUser();
    if (!user) {
      throw new Error('User is not authenticated');
    }

    // Validate CSRF token for state-changing operations
    if (requireCSRF && !(await validateFormCSRF(formData))) {
      return { error: 'Invalid request. Please try again.' };
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    return action(result.data, formData, user);
  };
}

type ActionWithTeamFunction<T> = (
  formData: FormData,
  team: TeamDataWithMembers
) => Promise<T>;

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/sign-in');
    }

    const team = await getTeamForUser();
    if (!team) {
      throw new Error('Team not found');
    }

    return action(formData, team);
  };
}

/**
 * Role-based access control middleware
 * @param requiredRole The required role for the action
 * @param action The action to execute
 * @returns Middleware function
 */
export function withRole<T>(
  requiredRole: string,
  action: (formData: FormData, user: User) => Promise<T>
) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/sign-in');
    }

    if (user.role !== requiredRole) {
      throw new Error('Insufficient permissions');
    }

    return action(formData, user);
  };
}
