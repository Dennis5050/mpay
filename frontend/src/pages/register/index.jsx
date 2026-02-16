import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import UserTypeCard from './components/UserTypeCard';
import CountrySelector from './components/CountrySelector';
import PhoneInput from './components/PhoneInput';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    countryCode: '+234',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const userTypes = {
    personal: {
      title: 'Personal Account',
      description: 'For individuals managing personal finances and money transfers',
      benefits: [
        'Send money to friends and family across Africa',
        'Receive payments instantly',
        'Low transaction fees',
        'Mobile money integration'
      ]
    },
    business: {
      title: 'Business Account',
      description: 'For businesses collecting payments and managing disbursements',
      benefits: [
        'Accept payments from customers',
        'Bulk payment processing',
        'Business analytics dashboard',
        'API integration support'
      ]
    }
  };

  const validateStep1 = () => {
    if (!formData?.userType) {
      setErrors({ userType: 'Please select an account type' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.country) {
      newErrors.country = 'Please select your country';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms of service';
    }

    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep2()) return;

    setLoading(true);

    setTimeout(() => {
      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser = {
        id: Math.floor(Math.random() * 10000),
        fullName: formData?.fullName,
        email: formData?.email,
        phone: `${formData?.countryCode}${formData?.phoneNumber}`,
        userType: formData?.userType,
        country: formData?.country,
        createdAt: new Date()?.toISOString()
      };

      console.log('Registration successful:', mockUser);
      
      setLoading(false);
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login with your credentials.',
          email: formData?.email 
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="Banknote" size={24} color="#FFFFFF" />
              </div>
              <div className="text-left">
                <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  MPay Africa
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Financial Freedom
                </p>
              </div>
            </Link>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Create Your Account
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Join thousands of users across Africa managing their finances
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {step > 1 ? <Icon name="Check" size={20} /> : <span className="text-sm font-medium">1</span>}
              </div>
              <div className={`h-1 w-16 md:w-24 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <span className="text-sm font-medium">2</span>
              </div>
            </div>
            <div className="flex justify-between mt-2 px-4">
              <span className="text-xs md:text-sm text-muted-foreground">Account Type</span>
              <span className="text-xs md:text-sm text-muted-foreground">Details</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                  Choose Your Account Type
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {Object.entries(userTypes)?.map(([type, data]) => (
                    <UserTypeCard
                      key={type}
                      type={type}
                      title={data?.title}
                      description={data?.description}
                      benefits={data?.benefits}
                      isSelected={formData?.userType === type}
                      onSelect={(selectedType) => setFormData({ ...formData, userType: selectedType })}
                    />
                  ))}
                </div>
                
                {errors?.userType && (
                  <p className="text-sm text-error mt-4 flex items-center gap-2">
                    <Icon name="AlertCircle" size={16} />
                    {errors?.userType}
                  </p>
                )}
              </div>

              <TrustSignals />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/login')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Login
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleNext}
                  iconName="ArrowRight"
                  iconPosition="right"
                  disabled={!formData?.userType}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-6">
                  Complete Your Profile
                </h3>

                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData?.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e?.target?.value })}
                    error={errors?.fullName}
                    required
                  />

                  <PhoneInput
                    countryCode={formData?.countryCode}
                    phoneNumber={formData?.phoneNumber}
                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                    onPhoneNumberChange={(number) => setFormData({ ...formData, phoneNumber: number })}
                    error={errors?.phoneNumber}
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData?.email}
                    onChange={(e) => setFormData({ ...formData, email: e?.target?.value })}
                    error={errors?.email}
                    required
                  />

                  <div>
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData?.password}
                      onChange={(e) => setFormData({ ...formData, password: e?.target?.value })}
                      error={errors?.password}
                      required
                    />
                    <PasswordStrengthIndicator password={formData?.password} />
                  </div>

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData?.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e?.target?.value })}
                    error={errors?.confirmPassword}
                    required
                  />

                  <CountrySelector
                    value={formData?.country}
                    onChange={(country) => setFormData({ ...formData, country })}
                    error={errors?.country}
                  />

                  <div className="space-y-3 pt-4 border-t border-border">
                    <Checkbox
                      label="I agree to the Terms of Service and African compliance requirements"
                      checked={formData?.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e?.target?.checked })}
                      error={errors?.agreeTerms}
                      required
                    />
                    
                    <Checkbox
                      label="I agree to the Privacy Policy and data protection terms"
                      checked={formData?.agreePrivacy}
                      onChange={(e) => setFormData({ ...formData, agreePrivacy: e?.target?.checked })}
                      error={errors?.agreePrivacy}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={handleBack}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  loading={loading}
                  iconName="UserPlus"
                  iconPosition="right"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;