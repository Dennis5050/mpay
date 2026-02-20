import WalletCard from "./WalletCard";

const WalletOverview = () => {
  const serviceWallet = {
    title: "Service Wallet",
    balance: 50000,
    currency: "KES",
    gradient: "from-slate-800 to-slate-600",
    actions: [
      { label: "Top Up", onClick: () => {} }
    ]
  };

  const paymentsWallet = {
    title: "Payments Wallet",
    balance: 9140,
    currency: "KES",
    gradient: "from-green-700 to-emerald-500",
    actions: [
      { label: "Deposit", onClick: () => {} },
      { label: "Withdraw", onClick: () => {} }
    ]
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <WalletCard {...serviceWallet} />
      <WalletCard {...paymentsWallet} />
    </div>
  );
};

export default WalletOverview;
