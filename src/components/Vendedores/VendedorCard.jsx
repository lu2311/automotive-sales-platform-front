import React from "react";

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function VendedorCard({ vendedor }) {
  return (
    <div className="card-soft p-3 h-100">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="avatar-circle" style={{ width: 52, height: 52, fontSize: "1rem" }}>
          {initials(vendedor.nombre)}
        </div>
        <div>
          <div className="fw-semibold">{vendedor.nombre}</div>
          <div className="text-muted-sm">{vendedor.rol}</div>
          <div className="text-warning small">
            {"★".repeat(Math.round(vendedor.rating))}
            {"☆".repeat(5 - Math.round(vendedor.rating))}
          </div>
        </div>
      </div>

      <div className="row text-center mb-3">
        <div className="col-4">
          <div className="fw-bold">{vendedor.ventas}</div>
          <div className="text-muted-sm">Ventas</div>
        </div>
        <div className="col-4">
          <div className="fw-bold">{vendedor.prospectos}</div>
          <div className="text-muted-sm">Prospectos</div>
        </div>
        <div className="col-4">
          <div className="fw-bold">{vendedor.conversion}%</div>
          <div className="text-muted-sm">Conversión</div>
        </div>
      </div>

      <div className="d-flex justify-content-between text-muted-sm mb-1">
        <span>Meta: {vendedor.meta} ventas</span>
        <span className="fw-semibold text-primary">{vendedor.avanceMeta}%</span>
      </div>
      <div className="progress progress-thin">
        <div
          className="progress-bar"
          style={{ width: `${vendedor.avanceMeta}%`, backgroundColor: "var(--primary)" }}
        />
      </div>
    </div>
  );
}
