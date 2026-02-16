import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import WelcomeHeader from './components/WelcomeHeader';
import TrustIndicators from './components/TrustIndicators';
import CreateAccountPrompt from './components/CreateAccountPrompt';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-xl">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8 animate-scale-in">
          <WelcomeHeader />
          
          <LoginForm />
          
          <CreateAccountPrompt />
          
          <TrustIndicators />
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground font-caption">
            By signing in, you agree to our{' '}
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              Terms of Service
            </button>
            {' '}and{' '}
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
          <p className="text-xs text-center text-muted-foreground font-caption mb-2">
            <strong className="text-foreground">Test Credentials:</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-card border border-border">
              <p className="text-primary font-semibold mb-1.5">Personal Account:</p>
              <p className="text-foreground mb-0.5">Phone: +254712345678</p>
              <p className="text-foreground mb-0.5">Email: john.doe@mpay.africa</p>
              <p className="text-foreground">Password: Personal@123</p>
            </div>
            <div className="p-3 rounded bg-card border border-border">
              <p className="text-secondary font-semibold mb-1.5">Business Account:</p>
              <p className="text-foreground mb-0.5">Phone: +254798765432</p>
              <p className="text-foreground mb-0.5">Email: business@mpay.africa</p>
              <p className="text-foreground">Password: Business@456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;