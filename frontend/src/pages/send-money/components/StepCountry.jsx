import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const StepCountry = ({ formData, setFormData }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const response = await fetch(
          'https://app.mpayafrica.site/api/countries',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await response.json();
        setCountries(data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const code = e.target.value;

    const selectedCountry = countries.find(
      (country) => country.country_code === code
    );

    // Store full country object (important for next steps)
    setFormData({
      ...formData,
      country: selectedCountry || null
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Select Country</h2>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Loader2" className="animate-spin" size={16} />
          Loading countries...
        </div>
      ) : (
        <select
          className="w-full border rounded-lg p-3"
          value={formData.country?.country_code || ''}
          onChange={handleCountryChange}
        >
          <option value="">Select country</option>

          {countries.map((country) => (
            <option
              key={country.country_code}
              value={country.country_code}
            >
              {country.country_name} ({country.currency})
            </option>
          ))}
        </select>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default StepCountry;