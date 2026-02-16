import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const RecipientSelector = ({ selectedRecipient, onRecipientSelect, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const savedRecipients = [
  {
    id: 1,
    name: "Kwame Mensah",
    phone: "+233 24 567 8901",
    type: "personal",
    country: "Ghana",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1406bf44b-1763296778400.png",
    avatarAlt: "Professional headshot of African man with short black hair wearing blue collared shirt"
  },
  {
    id: 2,
    name: "Amara Okafor",
    phone: "+234 80 234 5678",
    type: "personal",
    country: "Nigeria",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1afc73db3-1763293906263.png",
    avatarAlt: "Professional headshot of African woman with braided hair wearing white blouse"
  },
  {
    id: 3,
    name: "TechHub Solutions",
    phone: "+254 71 234 5678",
    type: "business",
    country: "Kenya",
    avatar: "https://images.unsplash.com/photo-1645534061947-01b4750bdbfe",
    avatarAlt: "Modern office building with glass facade and blue sky background"
  },
  {
    id: 4,
    name: "Fatima Hassan",
    phone: "+255 74 567 8901",
    type: "personal",
    country: "Tanzania",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c10fb07b-1763299083921.png",
    avatarAlt: "Professional headshot of African woman with hijab wearing green traditional dress"
  },
  {
    id: 5,
    name: "Marketplace Vendors Ltd",
    phone: "+256 77 890 1234",
    type: "business",
    country: "Uganda",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cacbe9e6-1767471144177.png",
    avatarAlt: "Modern retail storefront with large glass windows and wooden entrance"
  }];


  const filteredRecipients = savedRecipients?.filter((recipient) =>
  recipient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
  recipient?.phone?.includes(searchQuery)
  );

  const handleRecipientClick = (recipient) => {
    onRecipientSelect(recipient);
    setSearchQuery(recipient?.name);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    setShowDropdown(true);
    if (!value) {
      onRecipientSelect(null);
    }
  };

  return (
    <div className="relative">
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
          className="pr-10" />

        <div className="absolute right-3 top-[42px] pointer-events-none">
          <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
        </div>
      </div>
      {showDropdown && searchQuery && filteredRecipients?.length > 0 &&
      <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto scrollbar-custom">
          {filteredRecipients?.map((recipient) =>
        <button
          key={recipient?.id}
          type="button"
          onClick={() => handleRecipientClick(recipient)}
          className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors duration-250 border-b border-border last:border-b-0">

              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <img
              src={recipient?.avatar}
              alt={recipient?.avatarAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }} />

              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-body font-medium text-foreground truncate">
                    {recipient?.name}
                  </p>
                  {recipient?.type === 'business' &&
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-caption">
                      <Icon name="Building2" size={12} color="currentColor" />
                      Business
                    </span>
              }
                </div>
                <p className="text-sm text-muted-foreground font-caption">{recipient?.phone}</p>
                <p className="text-xs text-muted-foreground font-caption">{recipient?.country}</p>
              </div>
              <Icon name="ChevronRight" size={20} color="var(--color-muted-foreground)" />
            </button>
        )}
        </div>
      }
      {showDropdown && searchQuery && filteredRecipients?.length === 0 &&
      <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-lg p-4 text-center">
          <Icon name="UserX" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
          <p className="text-sm text-muted-foreground font-body">No recipients found</p>
          <p className="text-xs text-muted-foreground font-caption mt-1">
            Try searching with a different name or phone number
          </p>
        </div>
      }
      {selectedRecipient && !showDropdown &&
      <div className="mt-3 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-card">
              <img
              src={selectedRecipient?.avatar}
              alt={selectedRecipient?.avatarAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }} />

            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-body font-medium text-foreground truncate">
                  {selectedRecipient?.name}
                </p>
                {selectedRecipient?.type === 'business' &&
              <Icon name="Building2" size={14} color="var(--color-primary)" />
              }
              </div>
              <p className="text-sm text-muted-foreground font-caption">{selectedRecipient?.phone}</p>
            </div>
            <button
            type="button"
            onClick={() => {
              onRecipientSelect(null);
              setSearchQuery('');
            }}
            className="p-2 hover:bg-card rounded-lg transition-colors duration-250"
            aria-label="Remove recipient">

              <Icon name="X" size={18} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>
      }
    </div>);

};

export default RecipientSelector;