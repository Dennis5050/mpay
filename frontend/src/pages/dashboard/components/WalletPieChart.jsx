import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Service Wallet", value: 3000 },
  { name: "Payments Wallet", value: 9140 },
];

const COLORS = ["#0d6efd", "#198754"];

const WalletPieChart = () => {
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Wallet Distribution</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WalletPieChart;