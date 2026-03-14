import React, { useEffect, useRef, useState } from "react";
import Icon from "../../../components/AppIcon";

const API_URL = "https://api.mpay.africa/api/countries";
const CACHE_KEY = "mpay_countries";

const StepCountry = ({ formData, setFormData }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // ==========================================
  // FETCH COUNTRIES (WITH CACHE)
  // ==========================================
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);

        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached);
          setCountries(parsed);
          setFiltered(parsed);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        if (!res.ok) throw new Error("Failed to fetch countries");

        const data = await res.json();

        setCountries(data || []);
        setFiltered(data || []);

        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error(err);
        setError("Unable to load countries");
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // ==========================================
  // SEARCH FILTER
  // ==========================================
  useEffect(() => {
    if (!search) {
      setFiltered(countries);
      return;
    }

    const query = search.toLowerCase();

    const results = countries.filter((c) => {
      return (
        c.country_name.toLowerCase().includes(query) ||
        c.country_code.toLowerCase().includes(query)
      );
    });

    setFiltered(results);
    setActiveIndex(0);
  }, [search, countries]);

  // ==========================================
  // AUTO FOCUS SEARCH
  // ==========================================
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  // ==========================================
  // OUTSIDE CLICK CLOSE
  // ==========================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==========================================
  // SELECT COUNTRY
  // ==========================================
  const selectCountry = (country) => {
    setFormData({
      ...formData,
      country
    });

    setOpen(false);
  };

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        selectCountry(filtered[activeIndex]);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-1">Select Country</h2>

      <p className="text-sm text-muted-foreground mb-4">
        Choose the country where you want to withdraw to
      </p>

      <div
        ref={dropdownRef}
        className="relative"
        onKeyDown={handleKeyDown}
      >
        {/* SELECT BUTTON */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between border rounded-lg px-4 py-3 bg-background hover:border-primary transition"
        >
          {formData.country ? (
            <div className="flex items-center gap-2">
              <img
                src={formData.country.flag_url}
                alt={formData.country.country_name}
                className="w-5 h-5 rounded-full"
              />

              <span>
                {formData.country.country_name} (
                {formData.country.country_code})
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">
              Select a country...
            </span>
          )}

          <Icon
            name={open ? "ChevronUp" : "ChevronDown"}
            size={18}
          />
        </button>

        {/* DROPDOWN */}

        {open && (
          <div className="absolute z-20 mt-2 w-full bg-card border rounded-lg shadow-lg">

            {/* SEARCH */}

            <div className="p-3 border-b">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* LIST */}

            <div className="max-h-64 overflow-y-auto">

              {loading && (
                <div className="p-4 text-sm flex items-center gap-2">
                  <Icon
                    name="Loader2"
                    className="animate-spin"
                    size={16}
                  />
                  Loading countries...
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground">
                  No countries found
                </div>
              )}

              {!loading &&
                filtered.map((country, index) => (
                  <button
                    key={country.country_code}
                    onClick={() => selectCountry(country)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition
                    ${
                      index === activeIndex
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    }
                    ${
                      formData.country?.country_code ===
                      country.country_code
                        ? "bg-primary/5"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={country.flag_url}
                        alt={country.country_name}
                        className="w-5 h-5 rounded-full"
                      />

                      <span>{country.country_name}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {country.currency}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-3">{error}</p>
      )}
    </div>
  );
};

export default StepCountry;