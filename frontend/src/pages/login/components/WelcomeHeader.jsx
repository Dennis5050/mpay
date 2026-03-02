import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <header
      className="text-center mb-6"
      aria-labelledby="login-title"
    >
      {/* Logo / Brand Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary shadow-glow mb-4 motion-safe:animate-scale-in">
        <Icon name="Banknote" size={32} color="#FFFFFF" />
      </div>

      {/* Title */}
      <h1
        id="login-title"
        className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2"
      >
        Welcome Back
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-muted-foreground font-body max-w-md mx-auto leading-relaxed">
        Sign in to access your MPay Africa account and manage your payments,
        transfers, and financial activities securely.
      </p>
    </header>
  );
};

export default WelcomeHeader;