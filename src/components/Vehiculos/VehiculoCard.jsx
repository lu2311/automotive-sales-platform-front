import React from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16'%3ESin imagen%3C/text%3E%3C/svg%3E";

export default function VehiculoCard({ vehiculo, onDetail }) {
  const imgSrc = vehiculo.imagen || PLACEHOLDER;
  return (
    <div className="card-soft h-100 overflow-hidden vehicle-card">
      <div className="position-relative">
        <img src={imgSrc} alt={vehiculo.nombre} style={{width:'100%',height:180,objectFit:'cover'}} onError={e => { e.target.src = PLACEHOLDER }} />
        <span
          className={`badge-etapa position-absolute top-0 end-0 m-2 ${
            vehiculo.disponible ? "badge-cierre" : "badge-estado-fallida"
          }`}
        >
          {vehiculo.disponible ? "Disponible" : "Vendido"}
        </span>
      </div>
      <div className="p-3">
        <div className="text-muted-sm">{vehiculo.marca}</div>
        <div className="fw-semibold">{vehiculo.nombre}</div>
        <div className="fw-bold text-primary my-1">${vehiculo.precio.toLocaleString()}</div>
        <div className="text-muted-sm mb-2">
          <i className="bi bi-box-seam me-1" /> {vehiculo.disponible ? "Disponible para venta" : `Vendido ${vehiculo.sold} vez(es)`}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary-brand text-white btn-sm flex-grow-1" onClick={() => onDetail(vehiculo)}>Ver detalles</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onDetail(vehiculo)}>
            <i className="bi bi-three-dots-vertical" />
          </button>
        </div>
      </div>
    </div>
  );
}
