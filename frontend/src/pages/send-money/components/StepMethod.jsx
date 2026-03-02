import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const StepMethod = ({ formData, setFormData }) => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const countryCode = formData?.country?.country_code;

  useEffect(() => {
    if (!countryCode) return;

    const fetchMethods = async () => {
      try {
        setLoading(true);
        setError('');
        setMethods([]);

        const token = localStorage.getItem('token');

        const response = await fetch(
          `https://app.mpayafrica.site/api/countries/${countryCode}/discover`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }

        const data = await response.json();

        const options = data?.options || {};

        // Convert API response to UI categories
        const availableMethods = [];

        if (options.mobile_money?.length) {
          availableMethods.push({
            category: 'mobile_money',
            label: 'Mobile Money',
            icon: 'Smartphone'
          });
        }

        if (options.banks?.length) {
          availableMethods.push({
            category: 'bank',
            label: 'Bank Transfer',
            icon: 'Building2'
          });
        }

        if (options.cards?.length) {
          availableMethods.push({
            category: 'card',
            label: 'Card',
            icon: 'CreditCard'
          });
        }

        setMethods(availableMethods);
      } catch (err) {
        console.error(err);
        setError('Unable to load payment methods');
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, [countryCode]);

  const handleSelect = (method) => {
    setFormData({
      ...formData,
      payment_method: method
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

      {/* No country selected */}
      {!countryCode && (
        <p className="text-sm text-muted-foreground">
          Please select a country first
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Loader2" className="animate-spin" size={16} />
          Loading payment methods...
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Methods */}
      {!loading && methods.length > 0 && (
        <div className="space-y-3">
          {methods.map((method) => (
            <button
              key={method.category}
              onClick={() => handleSelect(method)}
              className={`w-full p-3 border rounded-lg text-left flex items-center gap-3 transition ${
                formData?.payment_method?.category === method.category
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon name={method.icon} size={18} />
              <span>{method.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && countryCode && methods.lengthી} 
           {!loading && countryCode && methods.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No payment methods available for this country
        </p>
      )}
    </div>
  );
};

export default StepMethod;