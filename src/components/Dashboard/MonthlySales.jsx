import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ventasMensuales2024 } from "../../data/mockData";

export default function MonthlySales() {
  return (
    <div className="card-soft p-3 h-100">
      <div className="fw-semibold mb-1">Ventas Mensuales 2024</div>
      <div className="text-muted-sm mb-3">Acumulado en USD</div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={ventasMensuales2024} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#f1f3f8" />
          <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
          <Line type="monotone" dataKey="monto" stroke="#2952e3" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
