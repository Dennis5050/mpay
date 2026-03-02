import React, { useState } from 'react';

const StepDetails = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const currency = formData?.country?.currency || '';
  const phonePrefix = formData?.country?.phone_prefix || '';

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow only positive numbers
    if (value < 0) return;

    setFormData({
      ...formData,
      amount: value
    });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Auto-add prefix if missing
    if (phonePrefix && !value.startsWith(phonePrefix)) {
      value = phonePrefix + value.replace(phonePrefix, '');
    }

    setFormData({
      ...formData,
      phone: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }

    if (!formData.phone || formData.phone.length < 8) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Optional: parent can call this later
  formData.validateDetails = validate;

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Enter Details</h2>

      <div className="space-y-4">
        {/* Amount */}
        <div>
          <input
            type="number"
            placeholder={`Amount ${currency}`}
            className={`w-full border rounded-lg p-3 ${
              errors.amount ? 'border-red-500' : ''
            }`}
            value={formData.amount || ''}
            onChange={handleAmountChange}
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">
              {errors.amount}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            placeholder={`Phone (${phonePrefix})`}
            className={`w-full border rounded-lg p-3 ${
              errors.phone ? 'border-red-500' : ''
            }`}
            value={formData.phone || ''}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Info */}
        {currency && (
          <p className="text-xs text-muted-foreground">
            Currency: {currency}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepDetails;