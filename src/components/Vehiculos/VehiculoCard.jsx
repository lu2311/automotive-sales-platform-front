import React from "react";

export default function VehiculoCard({ vehiculo }) {
  return (
    <div className="card-soft h-100 overflow-hidden vehicle-card">
      <div className="position-relative">
        <img src={vehiculo.imagen} alt={vehiculo.nombre} />
        <span
          className={`badge-etapa position-absolute top-0 end-0 m-2 ${
            vehiculo.disponible ? "badge-cierre" : "badge-estado-fallida"
          }`}
        >
          {vehiculo.disponible ? "Disponible" : "Sin stock"}
        </span>
      </div>
      <div className="p-3">
        <div className="text-muted-sm">{vehiculo.marca}</div>
        <div className="fw-semibold">{vehiculo.nombre}</div>
        <div className="fw-bold text-primary my-1">${vehiculo.precio.toLocaleString()}</div>
        <div className="text-muted-sm mb-2">
          <i className="bi bi-box-seam me-1" /> Stock: {vehiculo.stock} unidades
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary-brand text-white btn-sm flex-grow-1">Ver detalles</button>
          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-three-dots-vertical" />
          </button>
        </div>
      </div>
    </div>
  );
}
