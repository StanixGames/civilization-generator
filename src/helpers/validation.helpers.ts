const SIGN_UP_RES_EMAIL_ERRORS = [
  'auth/invalid-email',
  'auth/email-already-in-use',
];
const SIGN_UP_RES_PASSWORD_ERRORS = [
  'auth/weak-password',
];

/**
 * 
 * @param code from firebase
 * 
 * return invalid fields name
 */
export const validateSignUpResponse = (code: string): string | null => {
  if (!code) {
    return null;
  }
  if (SIGN_UP_RES_EMAIL_ERRORS.includes(code)) {
    return 'email';
  }
  if (SIGN_UP_RES_PASSWORD_ERRORS.includes(code)) {
    return 'password';
  }
  return null;
}

export const validateSignUpBeforeRequest = (email: string, password: string, nickName: string): { field: string, message: string } | null => {
  if (!email || email.length < 5) {
    return {
      field: 'email',
      message: 'Too short email address',
    }
  }
  if (!password || password.length < 6) {
    return {
      field: 'password',
      message: 'Too short password',
    }
  }
  if (!nickName || nickName.length < 3) {
    return {
      field: 'nickName',
      message: 'Too short nickName',
    }
  }
  return null;
}