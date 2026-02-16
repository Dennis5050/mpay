import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: 'Shield',
      text: 'Bank-level Security',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      text: 'PCI DSS Compliant',
      description: 'Meeting international security standards'
    },
    {
      icon: 'CheckCircle2',
      text: 'African Certified',
      description: 'Compliant with local regulations'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {indicators?.map((indicator, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={indicator?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground font-heading mb-1">
                {indicator?.text}
              </h4>
              <p className="text-xs text-muted-foreground font-caption line-clamp-2">
                {indicator?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;