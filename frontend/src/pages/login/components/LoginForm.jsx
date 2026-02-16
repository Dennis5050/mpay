import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const mockCredentials = {
    personal: {
      phone: '+254712345678',
      email: 'john.doe@mpay.africa',
      password: 'Personal@123'
    },
    business: {
      phone: '+254798765432',
      email: 'business@mpay.africa',
      password: 'Business@456'
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.identifier?.trim()) {
      newErrors.identifier = 'Phone number or email is required';
    } else {
      const isEmail = formData?.identifier?.includes('@');
      const isPhone = /^\+?[0-9]{10,15}$/?.test(formData?.identifier?.replace(/\s/g, ''));
      
      if (!isEmail && !isPhone) {
        newErrors.identifier = 'Please enter a valid phone number or email address';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const identifier = formData?.identifier?.toLowerCase()?.trim();
      const password = formData?.password;

      const isValidPersonal = 
        (identifier === mockCredentials?.personal?.phone || 
         identifier === mockCredentials?.personal?.email?.toLowerCase()) &&
        password === mockCredentials?.personal?.password;

      const isValidBusiness = 
        (identifier === mockCredentials?.business?.phone || 
         identifier === mockCredentials?.business?.email?.toLowerCase()) &&
        password === mockCredentials?.business?.password;

      if (isValidPersonal || isValidBusiness) {
        const userType = isValidPersonal ? 'personal' : 'business';
        const mockToken = `mpay_token_${Date.now()}_${userType}`;
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userType', userType);
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', identifier);
        }

        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setIsLoading(false);
        setErrors({
          submit: 'Invalid credentials. Please check your phone/email and password.'
        });
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Phone Number or Email"
        type="text"
        name="identifier"
        placeholder="+254712345678 or email@example.com"
        value={formData?.identifier}
        onChange={handleInputChange}
        error={errors?.identifier}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e?.target?.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
            disabled={isLoading}
          />
          <span className="text-sm text-foreground font-caption">Remember me</span>
        </label>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 font-caption font-medium transition-colors"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>
      {errors?.submit && (
        <div className="p-4 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error font-body">{errors?.submit}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;