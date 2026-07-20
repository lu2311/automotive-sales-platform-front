import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function InsuranceByType({ data }) {
  return (
    <div className="card-soft p-3 h-100">
      <div className="fw-semibold mb-1">Seguros por Tipo</div>
      <div className="text-muted-sm mb-3">Distribución de pólizas vendidas</div>
      <div className="d-flex align-items-center">
        <ResponsiveContainer width="55%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="valor"
              nameKey="tipo"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.tipo} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-grow-1">
          {data.map((item) => (
            <div key={item.tipo} className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <span
                  className="rounded-circle d-inline-block"
                  style={{ width: 9, height: 9, backgroundColor: item.color }}
                />
                <span style={{ fontSize: "0.78rem" }}>{item.tipo}</span>
              </div>
              <span className="fw-semibold" style={{ fontSize: "0.78rem" }}>
                {item.valor}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
