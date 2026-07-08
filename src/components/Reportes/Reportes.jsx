import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import PageHeader from "../common/PageHeader";
import { ventasMensuales2024, distribucionPorEtapa, tendenciaAnual } from "../../data/mockData";

export default function Reportes() {
  return (
    <div>
      <PageHeader breadcrumb="Reportes" title="Reportes" subtitle="Análisis en tiempo real" />

      <div className="row g-3 mb-3">
        <div className="col-lg-7">
          <div className="card-soft p-3 h-100">
            <div className="fw-semibold mb-1">Ventas por Mes (2024)</div>
            <div className="text-muted-sm mb-3">Ingresos mensuales en USD</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ventasMensuales2024} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f3f8" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar dataKey="monto" fill="#2952e3" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card-soft p-3 h-100">
            <div className="fw-semibold mb-1">Distribución por Etapa</div>
            <div className="text-muted-sm mb-3">Prospectos en cada fase del embudo</div>
            <div className="d-flex align-items-center">
              <ResponsiveContainer width="55%" height={220}>
                <PieChart>
                  <Pie data={distribucionPorEtapa} dataKey="valor" nameKey="etapa" outerRadius={80}>
                    {distribucionPorEtapa.map((e) => (
                      <Cell key={e.etapa} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-grow-1">
                {distribucionPorEtapa.map((item) => (
                  <div key={item.etapa} className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle d-inline-block" style={{ width: 9, height: 9, backgroundColor: item.color }} />
                      <span style={{ fontSize: "0.78rem" }}>{item.etapa}</span>
                    </div>
                    <span className="fw-semibold" style={{ fontSize: "0.78rem" }}>{item.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-soft p-3">
        <div className="fw-semibold mb-1">Tendencia Anual de Ventas</div>
        <div className="text-muted-sm mb-3">Progresión de ingresos a lo largo del año</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={tendenciaAnual} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f1f3f8" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="monto" stroke="#2952e3" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
