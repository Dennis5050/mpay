import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PhoneInput = ({ countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange, error }) => {
  const countryCodes = [
    { value: '+234', label: '+234 (Nigeria)' },
    { value: '+254', label: '+254 (Kenya)' },
    { value: '+233', label: '+233 (Ghana)' },
    { value: '+27', label: '+27 (South Africa)' },
    { value: '+255', label: '+255 (Tanzania)' },
    { value: '+256', label: '+256 (Uganda)' },
    { value: '+250', label: '+250 (Rwanda)' },
    { value: '+251', label: '+251 (Ethiopia)' },
    { value: '+20', label: '+20 (Egypt)' },
    { value: '+212', label: '+212 (Morocco)' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Phone Number <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <Select
            placeholder="Code"
            options={countryCodes}
            value={countryCode}
            onChange={onCountryCodeChange}
            searchable
          />
        </div>
        <div className="md:col-span-2">
          <Input
            type="tel"
            placeholder="8012345678"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e?.target?.value)}
            error={error}
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
      </div>
      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;