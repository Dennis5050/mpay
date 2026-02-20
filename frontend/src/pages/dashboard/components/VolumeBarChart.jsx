import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", sent: 8000, received: 12000 },
  { month: "Feb", sent: 10000, received: 15000 },
  { month: "Mar", sent: 7000, received: 11000 },
  { month: "Apr", sent: 9000, received: 14000 },
];

const VolumeBarChart = () => {
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Money Flow</h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" />
          <Tooltip />
          <Legend />
          <Bar dataKey="sent" fill="#dc3545" radius={[6, 6, 0, 0]} />
          <Bar dataKey="received" fill="#198754" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeBarChart;