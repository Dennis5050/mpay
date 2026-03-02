import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    {
      id: 'security',
      icon: 'Shield',
      title: 'Bank-level Security',
      description: 'Your data is encrypted and protected with industry-grade security.'
    },
    {
      id: 'pci',
      icon: 'Lock',
      title: 'PCI DSS Compliant',
      description: 'Built to meet international payment security standards.'
    },
    {
      id: 'compliance',
      icon: 'CheckCircle2',
      title: 'African Certified',
      description: 'Fully compliant with regional financial regulations.'
    }
  ];

  return (
    <section
      className="mt-8 pt-8 border-t border-border"
      aria-label="Security and trust information"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {indicators.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon
                name={item.icon}
                size={20}
                color="var(--color-primary)"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground font-heading mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground font-caption leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustIndicators;