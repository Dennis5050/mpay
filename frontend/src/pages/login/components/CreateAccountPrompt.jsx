import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CreateAccountPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          New to MPay Africa?
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-4">
          Create an account to start sending money, receiving payments, and managing your finances across Africa
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/register')}
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