import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ icon, label, description, path, variant = 'default' }) => {
  const navigate = useNavigate();

  const variantStyles = {
    default: 'bg-gradient-to-br from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground shadow-glow',
    secondary: 'bg-gradient-to-br from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary text-secondary-foreground shadow-glow-secondary',
    accent: 'bg-gradient-to-br from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground shadow-glow-accent'
  };

  return (
    <button
      onClick={() => navigate(path)}
      className={`
        relative overflow-hidden w-full p-4 rounded-xl border border-white/20
        ${variantStyles?.[variant]}
        transition-all duration-250 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        focus-ring group
      `}
      aria-label={`${label}: ${description}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
      
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-250">
          <Icon name={icon} size={24} color="currentColor" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-base font-heading font-semibold mb-0.5">
            {label}
          </h3>
          <p className="text-xs opacity-90 font-body">
            {description}
          </p>
        </div>
        <Icon name="ChevronRight" size={18} color="currentColor" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-250" />
      </div>
    </button>
  );
};

export default QuickActionButton;