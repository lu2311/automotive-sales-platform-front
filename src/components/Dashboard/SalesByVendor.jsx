import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { api } from "../../services/api";

export default function SalesByVendor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.getConversion().then(res => {
      setData((res || []).map(r => ({ nombre: r.seller, ventas: r.won })));
    }).catch(() => {});
  }, []);

  return (
    <div className="card-soft p-3 h-100">
      <div className="fw-semibold mb-1">Ventas por Vendedor</div>
      <div className="text-muted-sm mb-3">Prospectos convertidos en ventas</div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#f1f3f8" />
          <XAxis dataKey="nombre" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "#f4f6fb" }} />
          <Bar dataKey="ventas" fill="#2952e3" radius={[6, 6, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
