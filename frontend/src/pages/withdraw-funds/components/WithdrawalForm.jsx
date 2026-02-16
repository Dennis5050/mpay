import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const WithdrawalForm = ({ 
  selectedMethod, 
  onSubmit, 
  availableBalance,
  savedMethods 
}) => {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [newAccountDetails, setNewAccountDetails] = useState({
    accountNumber: '',
    accountName: '',
    bankName: '',
    mobileNumber: '',
    pickupLocation: ''
  });
  const [errors, setErrors] = useState({});
  const [isNewAccount, setIsNewAccount] = useState(false);

  const validateAmount = (value) => {
    const numValue = parseFloat(value);
    if (!value || numValue <= 0) {
      return 'Please enter a valid amount';
    }
    if (numValue > availableBalance) {
      return 'Insufficient balance';
    }
    if (numValue < 100) {
      return 'Minimum withdrawal amount is 100';
    }
    if (numValue > 50000) {
      return 'Maximum withdrawal amount is 50,000 per transaction';
    }
    return '';
  };

  const handleAmountChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9.]/g, '');
    setAmount(value);
    const error = validateAmount(value);
    setErrors(prev => ({ ...prev, amount: error }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const amountError = validateAmount(amount);
    if (amountError) {
      setErrors({ amount: amountError });
      return;
    }

    if (!isNewAccount && !selectedAccount) {
      setErrors({ account: 'Please select an account' });
      return;
    }

    if (isNewAccount) {
      if (selectedMethod === 'bank' && (!newAccountDetails?.accountNumber || !newAccountDetails?.bankName)) {
        setErrors({ account: 'Please provide bank account details' });
        return;
      }
      if (selectedMethod === 'mobile' && !newAccountDetails?.mobileNumber) {
        setErrors({ account: 'Please provide mobile money number' });
        return;
      }
      if (selectedMethod === 'cash' && !newAccountDetails?.pickupLocation) {
        setErrors({ account: 'Please select pickup location' });
        return;
      }
    }

    onSubmit({
      amount: parseFloat(amount),
      method: selectedMethod,
      accountDetails: isNewAccount ? newAccountDetails : savedMethods?.find(m => m?.id === selectedAccount)
    });
  };

  const bankOptions = [
    { value: 'equity', label: 'Equity Bank' },
    { value: 'kcb', label: 'KCB Bank' },
    { value: 'stanbic', label: 'Stanbic Bank' },
    { value: 'standard', label: 'Standard Chartered' },
    { value: 'absa', label: 'Absa Bank' }
  ];

  const pickupLocations = [
    { value: 'nairobi-cbd', label: 'Nairobi CBD - Moi Avenue' },
    { value: 'westlands', label: 'Westlands - Sarit Centre' },
    { value: 'karen', label: 'Karen - Karen Shopping Centre' },
    { value: 'thika', label: 'Thika - Blue Post Mall' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Withdrawal Amount"
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
        error={errors?.amount}
        required
        description={`Available balance: KES ${availableBalance?.toLocaleString()}`}
      />
      {savedMethods?.length > 0 && !isNewAccount && (
        <Select
          label={`Select ${selectedMethod === 'bank' ? 'Bank Account' : selectedMethod === 'mobile' ? 'Mobile Money Account' : 'Pickup Location'}`}
          options={savedMethods?.map(method => ({
            value: method?.id,
            label: method?.label,
            description: method?.description
          }))}
          value={selectedAccount}
          onChange={setSelectedAccount}
          error={errors?.account}
          required
        />
      )}
      {(savedMethods?.length === 0 || isNewAccount) && (
        <div className="space-y-4">
          {selectedMethod === 'bank' && (
            <>
              <Input
                label="Account Number"
                type="text"
                placeholder="Enter account number"
                value={newAccountDetails?.accountNumber}
                onChange={(e) => setNewAccountDetails(prev => ({ ...prev, accountNumber: e?.target?.value }))}
                required
              />
              <Input
                label="Account Name"
                type="text"
                placeholder="Enter account holder name"
                value={newAccountDetails?.accountName}
                onChange={(e) => setNewAccountDetails(prev => ({ ...prev, accountName: e?.target?.value }))}
                required
              />
              <Select
                label="Bank Name"
                options={bankOptions}
                value={newAccountDetails?.bankName}
                onChange={(value) => setNewAccountDetails(prev => ({ ...prev, bankName: value }))}
                placeholder="Select your bank"
                required
              />
            </>
          )}

          {selectedMethod === 'mobile' && (
            <Input
              label="Mobile Money Number"
              type="tel"
              placeholder="+254 712 345 678"
              value={newAccountDetails?.mobileNumber}
              onChange={(e) => setNewAccountDetails(prev => ({ ...prev, mobileNumber: e?.target?.value }))}
              description="Enter your M-Pesa or Airtel Money number"
              required
            />
          )}

          {selectedMethod === 'cash' && (
            <Select
              label="Pickup Location"
              options={pickupLocations}
              value={newAccountDetails?.pickupLocation}
              onChange={(value) => setNewAccountDetails(prev => ({ ...prev, pickupLocation: value }))}
              placeholder="Select pickup location"
              searchable
              required
            />
          )}
        </div>
      )}
      {savedMethods?.length > 0 && (
        <button
          type="button"
          onClick={() => setIsNewAccount(!isNewAccount)}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-250"
        >
          {isNewAccount ? 'Use saved account' : 'Add new account'}
        </button>
      )}
      <div className="pt-2 md:pt-3 lg:pt-4">
        <Button
          type="submit"
          variant="default"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Review
        </Button>
      </div>
    </form>
  );
};

export default WithdrawalForm;