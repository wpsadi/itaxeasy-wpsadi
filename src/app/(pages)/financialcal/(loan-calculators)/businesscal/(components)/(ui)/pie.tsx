"use client";

import * as React from "react";
import {
  Cell,
  Pie as RechartsPie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

interface PieProps {
  data: Array<{ name: string; value: number }>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function Pie({ data }: PieProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <RechartsPie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </RechartsPie>
      </PieChart>
    </ResponsiveContainer>
  );
}
