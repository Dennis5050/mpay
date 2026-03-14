import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const WaitingConfirmationModal = ({ isOpen, onCancel }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      navigate("/dashboard"); // change if your home route is different
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm p-6 text-center space-y-6">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin flex items-center justify-center">
            <Icon name="Smartphone" size={28} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Check Your Phone
          </h2>

          <p className="text-sm text-muted-foreground mt-2">
            Enter your M-Pesa PIN to complete the deposit
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          Waiting for confirmation...
        </div>

        <Button
          variant="outline"
          onClick={onCancel}
          fullWidth
        >
          Cancel
        </Button>

      </div>
    </div>
  );
};

export default WaitingConfirmationModal;