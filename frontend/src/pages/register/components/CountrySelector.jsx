import { useEffect, useState } from "react";
import { getCountries } from "../../services/authService";

const CountrySelector = ({ value, onChange, error }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getCountries();

        // Mapping to match your actual API response:
        // country_code, country_name, currency, phone_prefix, flag_url
        const formatted = data.map((country) => ({
          value: country.country_code, // Changed from .code
          label: `${country.country_name} (${country.phone_prefix})`, // Added prefix for UX
          description: `Currency: ${country.currency}`, // API doesn't have currency_name, just currency
          // If your Select component supports custom icons/images:
          icon: country.flag_url 
        }));

        setCountries(formatted);
      } catch (err) {
        console.error("Countries fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return (
    <Select
      label="Country"
      description="Select your country for localized services"
      placeholder={loading ? "Loading countries..." : "Choose your country"}
      options={countries}
      value={value}
      onChange={onChange}
      error={error}
      required
      searchable
      disabled={loading} // Good practice to disable while fetching
    />
  );
};

export default CountrySelector;