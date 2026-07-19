import React from "react";


export default function SalesFunnel({ funnel }) {

  const items = funnel.length ? funnel : [
    { stage: "initial", count: 0, conversion: 0 },
    { stage: "qualification", count: 0, conversion: 0 },
    { stage: "negotiation", count: 0, conversion: 0 },
    { stage: "closed", count: 0, conversion: 0 },
  ];

  const max = Math.max(...items.map(i => i.count), 1);

  const stageLabels = {
    initial: "Prospección",
    qualification: "Calificación",
    negotiation: "Negociación",
    closed: "Cierre"
  };

  return (
    <div className="card-soft p-3 h-100">
      <div className="fw-semibold mb-1">Embudo de Ventas</div>
      <div className="text-muted-sm mb-3">Flujo de prospectos por etapa</div>

      <div className="d-flex flex-column gap-3">
        {items.map((item) => (
          <div key={item.stage}>
            <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.82rem" }}>
              <span className="fw-medium">{stageLabels[item.stage] || item.stage}</span>
              <span className="text-muted-sm">
                {item.count} · {item.conversion}%
              </span>
            </div>
            <div className="bg-light rounded-pill" style={{ height: 26 }}>
              <div
                className="d-flex align-items-center rounded-pill text-white px-3"
                style={{
                  height: "100%",
                  width: `${(item.count / max) * 100}%`,
                  minWidth: 60,
                  backgroundColor: "var(--primary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {item.count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
