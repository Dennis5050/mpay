import React from "react";
import TransactionLineChart from "./TransactionLineChart";
import VolumeBarChart from "./VolumeBarChart";
import WalletPieChart from "./WalletPieChart";

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <TransactionLineChart />
      </div>

      <WalletPieChart />

      <div className="lg:col-span-3">
        <VolumeBarChart />
      </div>
    </div>
  );
};

export default ChartsSection;