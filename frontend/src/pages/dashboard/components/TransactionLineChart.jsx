import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 2100 },
  { day: "Wed", amount: 800 },
  { day: "Thu", amount: 2600 },
  { day: "Fri", amount: 1900 },
  { day: "Sat", amount: 3000 },
  { day: "Sun", amount: 2400 },
];

const TransactionLineChart = () => {
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Transaction Volume</h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="day" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#198754"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionLineChart;