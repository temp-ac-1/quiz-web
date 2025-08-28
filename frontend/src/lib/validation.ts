/**
 * Input validation and sanitization utilities for secure authentication
 * Implements RFC 5322 compliant email validation and security best practices
 */

// RFC 5322 compliant email regex (simplified but robust)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Password requirements regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// OTP regex (6 digits only)
const OTP_REGEX = /^\d{6}$/;

// Allowed characters for email (whitelist approach)
const EMAIL_WHITELIST = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]+$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Sanitizes input by removing potentially dangerous characters and HTML
 * @param input - Raw input string
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove SQL injection patterns
    .replace(/(union|select|insert|delete|update|drop|create|alter|exec|execute)/gi, '')
    // Remove JavaScript event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove dangerous characters
    .replace(/[<>'";&()]/g, '');
};

/**
 * Validates and sanitizes email address
 * @param email - Raw email input
 * @returns Validation result with sanitized email
 */
export const validateEmail = (email: string): ValidationResult & { sanitizedEmail?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  // Sanitize first
  const sanitized = sanitizeInput(email).toLowerCase();
  
  // Check whitelist
  if (!EMAIL_WHITELIST.test(sanitized)) {
    return { isValid: false, error: 'Email contains invalid characters' };
  }

  // Length check
  if (sanitized.length > 254) {
    return { isValid: false, error: 'Email is too long' };
  }

  // RFC 5322 validation
  if (!EMAIL_REGEX.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, sanitizedEmail: sanitized };
};

/**
 * Validates password strength
 * @param password - Raw password input
 * @returns Validation result
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password is too long' };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return { 
      isValid: false, 
      error: 'Password must contain uppercase, lowercase, number, and special character' 
    };
  }

  return { isValid: true };
};

/**
 * Validates OTP input
 * @param otp - Raw OTP input
 * @returns Validation result with sanitized OTP
 */
export const validateOTP = (otp: string): ValidationResult & { sanitizedOTP?: string } => {
  if (!otp) {
    return { isValid: false, error: 'OTP is required' };
  }

  // Sanitize - only keep digits
  const sanitized = otp.replace(/\D/g, '');

  if (sanitized.length !== 6) {
    return { isValid: false, error: 'OTP must be exactly 6 digits' };
  }

  if (!OTP_REGEX.test(sanitized)) {
    return { isValid: false, error: 'OTP must contain only numbers' };
  }

  return { isValid: true, sanitizedOTP: sanitized };
};

/**
 * Sanitizes password input (removes dangerous characters but preserves special chars for validation)
 * @param password - Raw password input
 * @returns Sanitized password
 */
export const sanitizePassword = (password: string): string => {
  return password
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove SQL injection patterns
    .replace(/(union|select|insert|delete|update|drop|create|alter|exec|execute)/gi, '')
    // Remove dangerous sequences
    .replace(/[<>]/g, '');
};

/**
 * Prevents clipboard operations for sensitive fields
 * @param event - React Clipboard event
 */
export const preventClipboard = (event: React.ClipboardEvent) => {
  event.preventDefault();
  return false;
};

/**
 * Sanitizes OTP input to only allow digits
 * @param value - Raw OTP input
 * @returns Sanitized OTP (digits only)
 */
export const sanitizeOTP = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 6);
};
