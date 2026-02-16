import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary shadow-glow mb-4 animate-scale-in">
        <Icon name="Banknote" size={32} color="#FFFFFF" />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
        Welcome Back
      </h1>
      
      <p className="text-sm md:text-base text-muted-foreground font-body max-w-md mx-auto">
        Sign in to access your MPay Africa account and manage your financial transactions
      </p>
    </div>
  );
};

export default WelcomeHeader;