import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTypeCard = ({ type, title, description, benefits, isSelected, onSelect }) => {
  const iconConfig = {
    personal: { name: 'User', color: 'var(--color-primary)' },
    business: { name: 'Building2', color: 'var(--color-secondary)' }
  };

  return (
    <button
      onClick={() => onSelect(type)}
      className={`
        w-full p-6 md:p-8 rounded-xl border-2 transition-all duration-250
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
        }
      `}
      aria-pressed={isSelected}
      aria-label={`Select ${title} account type`}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center flex-shrink-0
          ${isSelected ? 'bg-primary' : 'bg-muted'}
          transition-colors duration-250
        `}>
          <Icon 
            name={iconConfig?.[type]?.name} 
            size={24} 
            color={isSelected ? 'var(--color-primary-foreground)' : iconConfig?.[type]?.color} 
          />
        </div>
        
        <div className="flex-1 text-left">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            {description}
          </p>
          
          <ul className="space-y-2">
            {benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <Icon 
                  name="Check" 
                  size={16} 
                  color="var(--color-success)" 
                  className="flex-shrink-0 mt-0.5"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
};

export default UserTypeCard;