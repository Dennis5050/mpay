import React, { useState, useMemo, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const DEFAULT_AVATAR = '/assets/images/no_image.png';

const RecipientSelector = ({
  selectedRecipient = null,
  onRecipientSelect,
  error,
  recipients = [] // ← future: pass API data (/clientele)
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef(null);

  // Fallback mock data (used only if no recipients passed)
  const savedRecipients = recipients.length
    ? recipients
    : [
        {
          id: 1,
          name: "Kwame Mensah",
          phone: "+233245678901",
          type: "personal",
          country: "Ghana",
          avatar: "",
          avatarAlt: "User"
        },
        {
          id: 2,
          name: "TechHub Solutions",
          phone: "+254712345678",
          type: "business",
          country: "Kenya",
          avatar: "",
          avatarAlt: "Business"
        }
      ];

  // Optimized filtering
  const filteredRecipients = useMemo(() => {
    if (!searchQuery) return savedRecipients;

    const query = searchQuery.toLowerCase();

    return savedRecipients.filter((recipient) =>
      recipient?.name?.toLowerCase().includes(query) ||
      recipient?.phone?.includes(searchQuery)
    );
  }, [searchQuery, savedRecipients]);

  const handleRecipientClick = (recipient) => {
    onRecipientSelect?.(recipient);
    setSearchQuery(recipient?.name || '');
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(true);

    if (!value) {
      onRecipientSelect?.(null);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Input */}
      <div className="relative">
        <Input
          label="Recipient"
          type="text"
          placeholder="Search by name or phone number"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          error={error}
          required
          className="pr-10"
        />

        <div className="absolute right-3 top-[42px] pointer-events-none">
          <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
        </div>
      </div>

      {/* Dropdown Results */}
      {showDropdown && searchQuery && (
        <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-custom">
          {filteredRecipients.length > 0 ? (
            filteredRecipients.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                onClick={() => handleRecipientClick(recipient)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted transition border-b border-border last:border-b-0"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img
                    src={recipient.avatar || DEFAULT_AVATAR}
                    alt={recipient.avatarAlt || 'User'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">
                      {recipient.name}
                    </p>

                    {recipient.type === 'business' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                        <Icon name="Building2" size={12} />
                        Business
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {recipient.phone}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {recipient.country}
                  </p>
                </div>

                <Icon name="ChevronRight" size={20} color="var(--color-muted-foreground)" />
              </button>
            ))
          ) : (
            <div className="p-4 text-center">
              <Icon name="UserX" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No recipients found</p>
            </div>
          )}
        </div>
      )}

      {/* Selected Recipient Card */}
      {selectedRecipient && !showDropdown && (
        <div className="mt-3 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-card">
              <img
                src={selectedRecipient.avatar || DEFAULT_AVATAR}
                alt={selectedRecipient.avatarAlt || 'User'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {selectedRecipient.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedRecipient.phone}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onRecipientSelect?.(null);
                setSearchQuery('');
              }}
              className="p-2 hover:bg-card rounded-lg"
              aria-label="Remove recipient"
            >
              <Icon name="X" size={18} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientSelector;