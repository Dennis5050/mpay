import React, { useEffect, useState, useRef } from "react";
import Icon from "../../../components/AppIcon";

const API = "https://api.mpay.africa/api";

const StepMethod = ({ formData, setFormData }) => {
  const countryCode = formData?.country?.country_code;

  const [networks, setNetworks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // FETCH METHODS
  useEffect(() => {
    if (!countryCode) return;

    const loadMethods = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API}/countries/${countryCode}/discover`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        const data = await res.json();

        const options = data?.options || {};

        let list = [];

        if (options.mobile_money) {
          options.mobile_money.forEach((m) => {
            list.push({
              category: "mobile_money",
              name: m.name,
              code: m.code,
              provider: m.providers?.[0],
              min: m.meta?.min_amount,
              max: m.meta?.max_amount,
              currency: m.currency
            });
          });
        }

        if (options.banks) {
          options.banks.forEach((m) => {
            list.push({
              category: "bank",
              name: m.name,
              code: m.code,
              provider: m.providers?.[0],
              min: m.meta?.min_amount,
              max: m.meta?.max_amount,
              currency: m.currency
            });
          });
        }

        if (options.cards) {
          options.cards.forEach((m) => {
            list.push({
              category: "card",
              name: m.name,
              code: m.code,
              provider: m.providers?.[0],
              min: m.meta?.min_amount,
              max: m.meta?.max_amount,
              currency: m.currency
            });
          });
        }

        setNetworks(list);
        setFiltered(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMethods();
  }, [countryCode]);

  // FILTER BY CATEGORY
  useEffect(() => {
    let list = networks;

    if (category !== "all") {
      list = networks.filter((n) => n.category === category);
    }

    if (search) {
      list = list.filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(list);
  }, [search, category, networks]);

  const selectMethod = (method) => {
    setFormData({
      ...formData,
      payment_method: method
    });

    setOpen(false);
  };

  return (
    <div className="card p-6">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          Choose Payment Method
        </h2>

        <button className="text-sm text-primary">
          Change Country
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Select how you'd like to withdraw funds
      </p>

      {/* INFO BANNER */}

      <div className="bg-blue-50 border rounded-lg p-4 text-sm mb-4">
        <div className="flex gap-2">
          <Icon name="Info" size={16} />
          <div>
            <p className="font-medium">
              Multiple Payment Options Available
            </p>
            <p className="text-muted-foreground">
              Choose from different providers for the same payment method.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}

      <div className="flex gap-2 mb-4">

        {["all", "bank", "mobile_money"].map((type) => (
          <button
            key={type}
            onClick={() => setCategory(type)}
            className={`px-4 py-2 rounded-full text-sm border ${
              category === type
                ? "bg-primary text-white"
                : "bg-background"
            }`}
          >
            {type === "all"
              ? "All"
              : type === "bank"
              ? "Bank"
              : "Mobile Money"}
          </button>
        ))}
      </div>

      {/* SELECT NETWORK */}

      <label className="text-sm font-medium">
        Select Payment Network
      </label>

      <div ref={dropdownRef} className="relative mt-2">

        {/* SELECT FIELD */}

        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between border rounded-lg px-4 py-3"
        >
          {formData.payment_method ? (
            <span>
              {formData.payment_method.name}
            </span>
          ) : (
            <span className="text-muted-foreground">
              Select network
            </span>
          )}

          <Icon name="ChevronDown" size={18} />
        </button>

        {/* DROPDOWN */}

        {open && (
          <div className="absolute w-full bg-card border rounded-lg mt-2 shadow-lg">

            {/* SEARCH */}

            <div className="p-3 border-b">
              <input
                placeholder="Search networks..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            {/* NETWORK LIST */}

            <div className="max-h-60 overflow-y-auto">

              {loading && (
                <div className="p-4 text-sm">
                  Loading networks...
                </div>
              )}

              {!loading &&
                filtered.map((network) => (
                  <button
                    key={network.code}
                    onClick={() => selectMethod(network)}
                    className="w-full flex justify-between px-4 py-3 hover:bg-muted text-left"
                  >
                    <div>

                      <div className="font-medium">
                        {network.name}
                      </div>

                      <div className="text-xs text-muted-foreground">

                        Min: {network.currency} {network.min} • Max: {network.currency} {network.max}

                      </div>
                    </div>

                    {formData.payment_method?.code ===
                      network.code && (
                      <Icon
                        name="Check"
                        size={16}
                        className="text-primary"
                      />
                    )}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepMethod;