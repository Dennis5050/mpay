import WalletCard from "./WalletCard";

const WalletOverview = ({ wallets }) => {

  const serviceWallet = {
    title: "Service Wallet",
    balance: Number(wallets?.service_wallet?.balance || 0),
    currency: wallets?.service_wallet?.currency || "KES",
  };

  const paymentsWallet = {
    title: "Payments Wallet",
    balance: Number(wallets?.payments_wallet?.balance || 0),
    currency: wallets?.payments_wallet?.currency || "KES",
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <WalletCard {...serviceWallet} />

      <WalletCard {...paymentsWallet} />

    </div>
  );
};

export default WalletOverview;