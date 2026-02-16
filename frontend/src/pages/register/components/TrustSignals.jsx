import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const signals = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'GDPR & African data privacy compliant'
    },
    {
      icon: 'CheckCircle2',
      title: 'Licensed & Regulated',
      description: 'Authorized by African financial authorities'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-xl p-4 md:p-6 border border-border">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="ShieldCheck" size={20} color="var(--color-success)" />
        Your Security Matters
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals?.map((signal, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name={signal?.icon} size={20} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {signal?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {signal?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;