/**
 * Secure Authentication Page Component
 * Multi-step signup with email verification, username availability, and secure validation
 * Features: Real-time validation, OTP verification, username suggestions
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Github, Mail, Lock, Shield, ArrowRight, User, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';
import { Checkbox } from '../../@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../@/components/ui/input-otp';
import { toast } from 'sonner';
import { 
  validateEmail, 
  validatePassword, 
  validateOTP, 
  sanitizeInput, 
  sanitizePassword,
  sanitizeOTP,
  preventClipboard 
} from '../../src/lib/validation';

type SignUpStep = 'email' | 'otp' | 'details';

interface FormData {
  email: string;
  username: string;
  password: string;
  otp: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  otp?: string;
}

interface ValidationStatus {
  email: boolean;
  username: boolean;
  password: boolean;
  otp: boolean;
}

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState<SignUpStep>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    otp: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
    email: false,
    username: false,
    password: false,
    otp: false
  });
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  // OTP Timer Effect
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  /**
   * Toggle between Sign In and Sign Up forms
   */
  const toggleAuthMode = useCallback(() => {
    setIsSignUp(prev => !prev);
    setSignUpStep('email');
    setErrors({});
    setFormData({
      email: '',
      username: '',
      password: '',
      otp: '',
      rememberMe: false
    });
    setValidationStatus({
      email: false,
      username: false,
      password: false,
      otp: false
    });
  }, []);

  /**
   * Check username availability (simulated)
   */
  const checkUsernameAvailability = useCallback(async (username: string): Promise<boolean> => {
    if (!username || username.length < 3) return false;
    
    setUsernameChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate some usernames being taken
    const takenUsernames = ['admin', 'user', 'test', 'demo', 'example'];
    const isAvailable = !takenUsernames.includes(username.toLowerCase());
    
    if (!isAvailable) {
      // Generate suggestions
      const suggestions = [
        `${username}123`,
        `${username}_2024`,
        `${username}_dev`,
        `the_${username}`,
        `${username}_official`
      ];
      setUsernameSuggestions(suggestions);
    } else {
      setUsernameSuggestions([]);
    }
    
    setUsernameChecking(false);
    return isAvailable;
  }, []);

  /**
   * Handle input changes with real-time validation
   */
  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time validation
    if (field === 'email' && typeof value === 'string') {
      const { isValid } = validateEmail(value);
      setValidationStatus(prev => ({ ...prev, email: isValid && value.length > 0 }));
      if (value && !isValid) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }

    if (field === 'password' && typeof value === 'string') {
      const { isValid } = validatePassword(value);
      setValidationStatus(prev => ({ ...prev, password: isValid }));
      if (value && !isValid) {
        setErrors(prev => ({ 
          ...prev, 
          password: 'Password must contain uppercase, lowercase, number, and special character (min 8 chars)' 
        }));
      }
    }

    if (field === 'username' && typeof value === 'string') {
      if (value.length >= 3) {
        checkUsernameAvailability(value).then(isAvailable => {
          setValidationStatus(prev => ({ ...prev, username: isAvailable }));
          if (!isAvailable) {
            setErrors(prev => ({ ...prev, username: 'Username is not available' }));
          }
        });
      } else {
        setValidationStatus(prev => ({ ...prev, username: false }));
        if (value.length > 0) {
          setErrors(prev => ({ ...prev, username: 'Username must be at least 3 characters' }));
        }
      }
    }

    if (field === 'otp' && typeof value === 'string') {
      const { isValid } = validateOTP(value);
      setValidationStatus(prev => ({ ...prev, otp: isValid }));
    }
  }, [errors, checkUsernameAvailability]);

  /**
   * Handle email input with sanitization
   */
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    handleInputChange('email', sanitized);
  }, [handleInputChange]);

  /**
   * Handle username input with sanitization
   */
  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value).toLowerCase().replace(/[^a-z0-9_]/g, '');
    handleInputChange('username', sanitized);
  }, [handleInputChange]);

  /**
   * Handle password input with sanitization
   */
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePassword(e.target.value);
    handleInputChange('password', sanitized);
  }, [handleInputChange]);

  /**
   * Handle OTP input with digit-only sanitization
   */
  const handleOTPChange = useCallback((value: string) => {
    const sanitized = sanitizeOTP(value);
    handleInputChange('otp', sanitized);
  }, [handleInputChange]);

  /**
   * Send OTP (simulated)
   */
  const handleSendOTP = useCallback(async () => {
    if (!validationStatus.email) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSignUpStep('otp');
      setOtpTimer(60); // 60 second timer
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [validationStatus.email]);

  /**
   * Verify OTP (simulated)
   */
  const handleVerifyOTP = useCallback(async () => {
    if (!validationStatus.otp) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate OTP verification (accept any 6-digit number except 000000)
      if (formData.otp === '000000') {
        setErrors({ otp: 'Invalid OTP. Please try again.' });
        toast.error('Wrong OTP. Please try again.');
        return;
      }
      
      setSignUpStep('details');
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [validationStatus.otp, formData.otp]);

  /**
   * Resend OTP
   */
  const handleResendOTP = useCallback(async () => {
    await handleSendOTP();
  }, [handleSendOTP]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (signUpStep === 'email') {
        await handleSendOTP();
        return;
      }
      
      if (signUpStep === 'otp') {
        await handleVerifyOTP();
        return;
      }
      
      // Final signup step
      if (!validationStatus.username || !validationStatus.password) {
        toast.error('Please fill all required fields correctly');
        return;
      }
    } else {
      // Sign in validation
      if (!validationStatus.email || !formData.password) {
        toast.error('Please enter your email and password');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(isSignUp ? 'Account created successfully!' : 'Signed in successfully!');
      
      // Reset form
      setFormData({
        email: '',
        username: '',
        password: '',
        otp: '',
        rememberMe: false
      });
      setErrors({});
      setValidationStatus({
        email: false,
        username: false,
        password: false,
        otp: false
      });
      setSignUpStep('email');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isSignUp, signUpStep, validationStatus, formData.password, handleSendOTP, handleVerifyOTP]);

  /**
   * Handle OAuth sign in (UI only)
   */
  const handleOAuthSignIn = useCallback((provider: 'google' | 'github') => {
    toast.info(`${provider} OAuth integration coming soon!`);
  }, []);

  /**
   * Use username suggestion
   */
  const useSuggestion = useCallback((suggestion: string) => {
    handleInputChange('username', suggestion);
    setUsernameSuggestions([]);
  }, [handleInputChange]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 circuit-bg opacity-5"></div>
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl relative">
        <CardHeader className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Shield className="w-12 h-12 text-primary mx-auto glow-primary" />
          </motion.div>
          
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Secure Access
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSignUp ? 'Create your secure account' : 'Sign in to your account'}
            </CardDescription>
          </div>

          {/* Toggle Switch */}
          <div className="flex bg-muted/50 rounded-lg p-1 relative">
            <motion.div
              className="absolute top-1 bottom-1 bg-primary/20 border border-primary/50 rounded-md"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: isSignUp ? '50%' : '4px',
                right: isSignUp ? '4px' : '50%'
              }}
            />
            <button
              onClick={toggleAuthMode}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors relative z-10 ${
                !isSignUp ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={toggleAuthMode}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors relative z-10 ${
                isSignUp ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full btn-cyber"
              onClick={() => handleOAuthSignIn('google')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full btn-cyber"
              onClick={() => handleOAuthSignIn('github')}
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Main Form - Fixed Height Container */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.form
                key={isSignUp ? `signup-${signUpStep}` : 'signin'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Sign In Form */}
                {!isSignUp && (
                  <>
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          placeholder="user@example.com"
                          className="input-cyber pr-10"
                          autoComplete="off"
                          required
                        />
                        {formData.email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {validationStatus.email ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handlePasswordChange}
                          placeholder="Enter password"
                          className="input-cyber pr-10"
                          autoComplete="off"
                          onPaste={preventClipboard}
                          onCopy={preventClipboard}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange('rememberMe', !!checked)}
                        />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground">
                          Remember me
                        </Label>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                        onClick={() => toast.info('Password reset coming soon!')}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </>
                )}

                {/* Sign Up Form */}
                {isSignUp && (
                  <>
                    {/* Email Step */}
                    {signUpStep === 'email' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-sm font-medium">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Input
                              id="signup-email"
                              type="email"
                              value={formData.email}
                              onChange={handleEmailChange}
                              placeholder="user@example.com"
                              className="input-cyber pr-10"
                              autoComplete="off"
                              required
                            />
                            {formData.email && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {validationStatus.email ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                          )}
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                          We'll send a verification code to your email
                        </div>
                      </div>
                    )}

                    {/* OTP Step */}
                    {signUpStep === 'otp' && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-4">
                            Enter the 6-digit code sent to <br />
                            <span className="font-medium text-foreground">{formData.email}</span>
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-center block">
                            Verification Code
                          </Label>
                          <div className="flex justify-center">
                            <InputOTP
                              maxLength={6}
                              value={formData.otp}
                              onChange={handleOTPChange}
                              onPaste={preventClipboard}
                              onCopy={preventClipboard}
                            >
                              <InputOTPGroup>
                                {[...Array(6)].map((_, i) => (
                                  <InputOTPSlot 
                                    key={i} 
                                    index={i} 
                                    className="input-cyber w-10 h-12" 
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                          {errors.otp && (
                            <p className="text-sm text-destructive text-center">{errors.otp}</p>
                          )}
                        </div>

                        {/* Resend OTP */}
                        <div className="text-center">
                          {otpTimer > 0 ? (
                            <div className="flex items-center justify-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              Resend code in {otpTimer}s
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOTP}
                              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center mx-auto"
                            >
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Resend Code
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Details Step */}
                    {signUpStep === 'details' && (
                      <div className="space-y-4">
                        {/* Username Field */}
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-medium">
                            Username
                          </Label>
                          <div className="relative">
                            <Input
                              id="username"
                              type="text"
                              value={formData.username}
                              onChange={handleUsernameChange}
                              placeholder="Choose username"
                              className="input-cyber pr-10 pl-10"
                              autoComplete="off"
                              required
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            {formData.username && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {usernameChecking ? (
                                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                ) : validationStatus.username ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                            )}
                          </div>
                          {errors.username && (
                            <p className="text-sm text-destructive">{errors.username}</p>
                          )}
                          
                          {/* Username Suggestions */}
                          {usernameSuggestions.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Suggestions:</p>
                              <div className="flex flex-wrap gap-2">
                                {usernameSuggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => useSuggestion(suggestion)}
                                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20 hover:bg-primary/20 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-sm font-medium">
                            Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="signup-password"
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={handlePasswordChange}
                              placeholder="Create strong password"
                              className="input-cyber pr-20"
                              autoComplete="off"
                              onPaste={preventClipboard}
                              onCopy={preventClipboard}
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                              {formData.password && (
                                validationStatus.password ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500" />
                                )
                              )}
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full btn-cyber group"
                    disabled={isLoading || (isSignUp && signUpStep === 'email' && !validationStatus.email) || (isSignUp && signUpStep === 'otp' && !validationStatus.otp)}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Lock className="w-4 h-4 mr-2" />
                        {isSignUp 
                          ? signUpStep === 'email' 
                            ? 'Send OTP' 
                            : signUpStep === 'otp' 
                              ? 'Verify OTP' 
                              : 'Create Account'
                          : 'Sign In'
                        }
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </motion.form>
            </AnimatePresence>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔐 Your data is encrypted and secure
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;