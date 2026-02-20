import React from 'react';
import Icon from '../../../components/AppIcon';

const WalletCard = ({
  title = "Wallet",
  balance = 230222,
  currency = "KES",
  trend = "up",
  trendPercentage = 0
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary via-primary-light to-secondary p-6 shadow-lg hover:shadow-glow transition-all duration-250 group">
      
      {/* Glow layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        
        {/* Wallet Title */}
        <p className="text-[10px] font-caption text-white/70 uppercase tracking-widest mb-1">
          {title}
        </p>

        {/* Available Balance */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-xs font-caption text-white/80 mb-1 uppercase tracking-wider">
              Available Balance
            </p>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
              {formatCurrency(balance)}
            </h2>
          </div>

          {/* Wallet Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-250">
            <Icon name="Wallet" size={24} color="#FFFFFF" />
          </div>
        </div>

        {/* Trend */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/20">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm ${
            trend === 'up' ? 'bg-white/20' : 'bg-white/15'
          }`}>
            <Icon
              name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
              size={14}
              color="#FFFFFF"
            />
            <span className="text-xs font-caption font-semibold text-white">
              {trendPercentage}%
            </span>
          </div>

          <span className="text-xs text-white/70 font-caption">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
