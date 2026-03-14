import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const formatAmount = (amount, currency) => {
  const value = Number(amount) || 0;

  return `${currency} ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "-";

  return new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const SuccessModal = ({ isOpen, onClose, transactionData = {} }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const {
    amount = 0,
    currency = "KES",
    transactionRef = "",
    timestamp = new Date().toISOString(),
    account = {},
    payment_method = {}
  } = transactionData;

  const accountNumber = account?.account_number || "-";

  const methodName =
    payment_method?.name ||
    payment_method?.label ||
    payment_method?.code ||
    "Payment";

  // Redirect countdown
  useEffect(() => {
    if (!isOpen) return;

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/dashboard"); // change if needed
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, [isOpen, navigate]);

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  const handleCopy = async () => {
    if (!transactionRef) return;

    try {
      await navigator.clipboard.writeText(transactionRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md">

        <div className="p-6 space-y-6">

          {/* Header */}
          <div className="text-center space-y-4">

            <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <Icon
                name="CheckCircle2"
                size={48}
                color="var(--color-success)"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Transaction Successful
              </h2>

              <p className="text-sm text-muted-foreground">
                Your payment has been processed successfully
              </p>
            </div>

          </div>

          {/* Amount */}
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">

            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                Amount Sent
              </p>

              <p className="text-3xl font-bold text-success">
                {formatAmount(amount, currency)}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>
                Redirecting to dashboard in {secondsLeft}s
              </span>
            </div>

          </div>

          {/* Details */}
          <div className="space-y-3">

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">
                Payment Method
              </span>

              <span className="font-medium">
                {methodName}
              </span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">
                Recipient Account
              </span>

              <span className="font-medium">
                {accountNumber}
              </span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">

              <span className="text-sm text-muted-foreground">
                Transaction ID
              </span>

              <div className="flex items-center gap-2">

                <span className="font-mono text-sm">
                  {transactionRef || "-"}
                </span>

                {transactionRef && (
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-card rounded transition"
                  >
                    <Icon
                      name={copied ? "Check" : "Copy"}
                      size={14}
                      color="var(--color-primary)"
                    />
                  </button>
                )}

              </div>

            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">

              <span className="text-sm text-muted-foreground">
                Date & Time
              </span>

              <span className="text-sm">
                {formatDate(timestamp)}
              </span>

            </div>

          </div>

          {/* Notice */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">

            <div className="flex gap-3">

              <Icon
                name="Bell"
                size={18}
                color="var(--color-primary)"
              />

              <div>
                <p className="text-sm font-medium">
                  Transaction Completed
                </p>

                <p className="text-xs text-muted-foreground">
                  Save your transaction ID for future reference.
                </p>
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">

            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Done
            </Button>

            <Button
              variant="default"
              onClick={handleViewTransactions}
              iconName="Receipt"
              iconPosition="right"
              fullWidth
            >
              View Transactions
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SuccessModal;