const WalletCard = ({ title, balance, currency }) => {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#8C1826] to-[#C62839] p-6 text-white shadow-lg">

      {/* subtle highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <p className="text-xs uppercase tracking-wider text-white/80">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {formatCurrency(balance)}
      </h2>

      <p className="text-sm text-white/80 mt-1">
        Available Balance
      </p>

    </div>
  );
};

export default WalletCard;