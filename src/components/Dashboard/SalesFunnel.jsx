import React from "react";
import { embudoVentas } from "../../data/mockData";

export default function SalesFunnel() {
  const max = embudoVentas[0].cantidad;

  return (
    <div className="card-soft p-3 h-100">
      <div className="fw-semibold mb-1">Embudo de Ventas</div>
      <div className="text-muted-sm mb-3">Flujo de prospectos por etapa</div>

      <div className="d-flex flex-column gap-3">
        {embudoVentas.map((item) => (
          <div key={item.etapa}>
            <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.82rem" }}>
              <span className="fw-medium">{item.etapa}</span>
              <span className="text-muted-sm">
                {item.cantidad} · {item.porcentaje}%
              </span>
            </div>
            <div className="bg-light rounded-pill" style={{ height: 26 }}>
              <div
                className="d-flex align-items-center rounded-pill text-white px-3"
                style={{
                  height: "100%",
                  width: `${(item.cantidad / max) * 100}%`,
                  minWidth: 60,
                  backgroundColor: "var(--primary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {item.cantidad}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
