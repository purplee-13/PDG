'use client';

import {
    Bar,
    BarChart as RechartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
  { name: 'Bacukiki', value: 400 },
  { name: 'BacukikiBarat', value: 300 },
  { name: 'Soreang', value: 500 },
  { name: 'Ujung', value: 200 },
];

export const BarChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={{ fontSize: 10 }}
            />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#35AC3E" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
