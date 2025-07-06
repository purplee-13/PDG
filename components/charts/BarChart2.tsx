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
  { name: 'Ya', value: 15 },
  { name: 'Tidak', value: 28 },
  { name: 'Beresiko', value: 36 },
  { name: 'TIdak Beresiko', value: 45 },
];

export const BarChart2 = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#FFA500" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
