import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ============================
  // Autofill from Register (FIXED)
  // Runs once only to avoid infinite loop
  // ============================
  useEffect(() => {
    const email = location.state?.email;

    if (email) {
      setFormData(prev => ({
        ...prev,
        identifier: email
      }));
    }
  }, []); // IMPORTANT: no location.state dependency

  // ============================
  // Load remembered user
  // ============================
  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      setFormData(prev => ({
        ...prev,
        identifier: savedUser
      }));
      setRememberMe(true);
    }
  }, []);

  // ============================
  // Validation
  // ============================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================
  // Input change
  // ============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ============================
  // Submit
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.identifier, formData.password);

      if (rememberMe) {
        localStorage.setItem('rememberedUser', formData.identifier);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      // Navigate after successful login
      navigate('/dashboard');

    } catch (error) {
      if (error.status === 401) {
        setErrors({ submit: 'Invalid email or password' });
      } else if (error.status === 422) {
        setErrors(error.errors || { submit: 'Validation error' });
      } else {
        setErrors({
          submit: error.message || 'Login failed'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============================
  // UI
  // ============================
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <Input
        label="Email"
        type="email"
        name="identifier"
        placeholder="email@example.com"
        value={formData.identifier}
        onChange={handleInputChange}
        error={errors.identifier}
        required
        disabled={isLoading}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4"
            disabled={isLoading}
          />
          <span className="text-sm">Remember me</span>
        </label>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
          <Icon name="AlertCircle" size={18} />
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;