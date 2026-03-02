import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CreateAccountPrompt = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register', { replace: false });
  };

  return (
    <div
      className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
      role="region"
      aria-label="Create account prompt"
    >
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          New to MPay Africa?
        </h3>

        <p className="text-sm text-muted-foreground font-body mb-5 leading-relaxed">
          Create an account to send money, receive payments, and manage your
          finances securely across Africa.
        </p>

        <Button
          variant="outline"
          onClick={handleNavigate}
          iconName="UserPlus"
          iconPosition="left"
          className="mx-auto"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;