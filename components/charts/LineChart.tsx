'use client';

import {
    Line,
    LineChart as RechartsLineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
  { name: 'Q1', value: 300 },
  { name: 'Q2', value: 200 },
  { name: 'Q3', value: 400 },
  { name: 'Q4', value: 350 },
];

export const LineChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#083358" strokeWidth={3} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
