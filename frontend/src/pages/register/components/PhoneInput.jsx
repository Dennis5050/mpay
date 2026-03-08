import React, { useEffect, useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { getCountries } from "../../services/authService";

const PhoneInput = ({ countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange, error }) => {
  const [countryCodes, setCountryCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const data = await getCountries();
        
        // Map API data to the select format
        const formatted = data.map((c) => ({
          value: c.phone_prefix,
          label: `${c.phone_prefix} (${c.country_name})`,
          // Including the flag URL if your Select component supports icons
          icon: c.flag_url 
        }));

        setCountryCodes(formatted);
      } catch (err) {
        console.error("Failed to load country codes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Phone Number <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <Select
            placeholder={loading ? "..." : "Code"}
            options={countryCodes}
            value={countryCode}
            onChange={onCountryCodeChange}
            searchable
            disabled={loading}
          />
        </div>
        <div className="md:col-span-2">
          <Input
            type="tel"
            placeholder="8012345678"
            value={phoneNumber}
            // Use e.target.value or direct value depending on your Input component's design
            onChange={(e) => onPhoneNumberChange(e?.target ? e.target.value : e)}
            error={!!error} // Some Input components expect a boolean for the error state
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={10}
          />
        </div>
      </div>
      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;