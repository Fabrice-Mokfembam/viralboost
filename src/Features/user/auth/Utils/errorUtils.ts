import type { AuthError, LoginErrorResponse, RegistrationErrorResponse, AuthErrorResponse } from '../../../../data';

/**
 * Parses authentication errors from API responses
 */
export const parseAuthError = (error: unknown): AuthError | null => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  // Check if it's an axios error with response data
  if ('response' in error && error.response && typeof error.response === 'object') {
    const response = error.response as { data?: unknown; status?: number };
    
    if (response.data && typeof response.data === 'object') {
      return response.data as AuthError;
    }
  }

  // Check if it's a direct error object
  if ('message' in error) {
    return error as AuthError;
  }

  return null;
};

/**
 * Formats login error messages for display
 */
export const formatLoginError = (error: AuthError): string => {
  if ('error' in error) {
    const loginError = error as LoginErrorResponse;
    
    switch (loginError.error) {
      case 'InvalidCredentials':
        return 'Invalid credentials. Please check your email/phone and password.';
      case 'AccountDeactivated':
        return 'Your account has been deactivated. Please contact support for assistance.';
      case 'EmailNotVerified':
        return 'Please verify your email address before logging in. Check your inbox for verification instructions.';
      default:
        return loginError.message || 'Login failed. Please try again.';
    }
  }

  // Handle generic authentication errors
  if ('message' in error) {
    const authError = error as AuthErrorResponse;
    return authError.message || 'Authentication failed. Please try again.';
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Formats registration error messages for display
 */
export const formatRegistrationError = (error: AuthError): { message: string; fieldErrors?: Record<string, string> } => {
  if ('errors' in error) {
    const regError = error as RegistrationErrorResponse;
    const fieldErrors: Record<string, string> = {};
    
    // Extract field-specific errors
    if (regError.errors) {
      Object.entries(regError.errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          fieldErrors[field] = messages[0]; // Take the first error message
        }
      });
    }

    return {
      message: regError.message || 'Registration failed. Please check the form for errors.',
      fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined
    };
  }

  // Handle generic authentication errors
  if ('message' in error) {
    const authError = error as AuthErrorResponse;
    return {
      message: authError.message || 'Registration failed. Please try again.'
    };
  }

  return {
    message: 'An unexpected error occurred during registration. Please try again.'
  };
};

/**
 * Formats generic authentication error messages
 */
export const formatAuthError = (error: AuthError): string => {
  if ('message' in error) {
    return error.message;
  }

  return 'An authentication error occurred. Please try again.';
};

/**
 * Checks if an error is a specific type of authentication error
 */
export const isLoginError = (error: AuthError): error is LoginErrorResponse => {
  return 'error' in error && typeof error.error === 'string';
};

export const isRegistrationError = (error: AuthError): error is RegistrationErrorResponse => {
  return 'errors' in error;
};

export const isAuthError = (error: AuthError): error is AuthErrorResponse => {
  return 'message' in error && !('error' in error) && !('errors' in error);
};

/**
 * Gets user-friendly error messages for common authentication scenarios
 */
export const getAuthErrorMessage = (error: unknown): string => {
  const parsedError = parseAuthError(error);
  
  if (!parsedError) {
    return 'An unexpected error occurred. Please try again.';
  }

  if (isLoginError(parsedError)) {
    return formatLoginError(parsedError);
  }

  if (isRegistrationError(parsedError)) {
    return formatRegistrationError(parsedError).message;
  }

  return formatAuthError(parsedError);
};

/**
 * Gets field-specific error messages for registration
 */
export const getRegistrationFieldErrors = (error: unknown): Record<string, string> | null => {
  const parsedError = parseAuthError(error);
  
  if (!parsedError || !isRegistrationError(parsedError)) {
    return null;
  }

  const { fieldErrors } = formatRegistrationError(parsedError);
  return fieldErrors || null;
};
