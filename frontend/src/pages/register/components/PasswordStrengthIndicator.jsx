import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' };
    
    let strength = 0;
    if (pwd?.length >= 8) strength++;
    if (pwd?.length >= 12) strength++;
    if (/[a-z]/?.test(pwd) && /[A-Z]/?.test(pwd)) strength++;
    if (/[0-9]/?.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/?.test(pwd)) strength++;

    const levels = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Weak', color: 'bg-error' },
      { level: 2, label: 'Fair', color: 'bg-warning' },
      { level: 3, label: 'Good', color: 'bg-primary' },
      { level: 4, label: 'Strong', color: 'bg-success' },
      { level: 5, label: 'Very Strong', color: 'bg-success' }
    ];

    return levels?.[strength];
  };

  let strength = calculateStrength(password);
  
  if (!password) return null;

  const requirements = [
    { met: password?.length >= 8, text: 'At least 8 characters' },
    { met: /[a-z]/?.test(password) && /[A-Z]/?.test(password), text: 'Upper & lowercase letters' },
    { met: /[0-9]/?.test(password), text: 'At least one number' },
    { met: /[^a-zA-Z0-9]/?.test(password), text: 'Special character (!@#$%^&*)' }
  ];

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-250 ${strength?.color}`}
            style={{ width: `${(strength?.level / 5) * 100}%` }}
          />
        </div>
        {strength?.label && (
          <span className={`text-xs font-medium ${strength?.color?.replace('bg-', 'text-')}`}>
            {strength?.label}
          </span>
        )}
      </div>
      <ul className="space-y-1.5">
        {requirements?.map((req, index) => (
          <li key={index} className="flex items-center gap-2 text-xs">
            <Icon 
              name={req?.met ? 'CheckCircle2' : 'Circle'} 
              size={14} 
              color={req?.met ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
            />
            <span className={req?.met ? 'text-success' : 'text-muted-foreground'}>
              {req?.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;