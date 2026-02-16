import React from 'react';
import Select from '../../../components/ui/Select';

const CountrySelector = ({ value, onChange, error }) => {
  const africanCountries = [
    { value: 'NG', label: 'Nigeria', description: 'NGN - Nigerian Naira' },
    { value: 'KE', label: 'Kenya', description: 'KES - Kenyan Shilling' },
    { value: 'GH', label: 'Ghana', description: 'GHS - Ghanaian Cedi' },
    { value: 'ZA', label: 'South Africa', description: 'ZAR - South African Rand' },
    { value: 'TZ', label: 'Tanzania', description: 'TZS - Tanzanian Shilling' },
    { value: 'UG', label: 'Uganda', description: 'UGX - Ugandan Shilling' },
    { value: 'RW', label: 'Rwanda', description: 'RWF - Rwandan Franc' },
    { value: 'ET', label: 'Ethiopia', description: 'ETB - Ethiopian Birr' },
    { value: 'EG', label: 'Egypt', description: 'EGP - Egyptian Pound' },
    { value: 'MA', label: 'Morocco', description: 'MAD - Moroccan Dirham' },
    { value: 'CI', label: 'Côte d\'Ivoire', description: 'XOF - West African CFA Franc' },
    { value: 'SN', label: 'Senegal', description: 'XOF - West African CFA Franc' },
    { value: 'CM', label: 'Cameroon', description: 'XAF - Central African CFA Franc' },
    { value: 'ZM', label: 'Zambia', description: 'ZMW - Zambian Kwacha' },
    { value: 'ZW', label: 'Zimbabwe', description: 'USD - US Dollar' }
  ];

  return (
    <Select
      label="Country"
      description="Select your country for localized services"
      placeholder="Choose your country"
      options={africanCountries}
      value={value}
      onChange={onChange}
      error={error}
      required
      searchable
    />
  );
};

export default CountrySelector;