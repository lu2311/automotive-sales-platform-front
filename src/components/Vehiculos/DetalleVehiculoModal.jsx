import React from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16'%3ESin imagen%3C/text%3E%3C/svg%3E";

export default function DetalleVehiculoModal({ vehiculo, show, onClose, onEdit, onDelete }) {
  if (!show) return null;

  const imgSrc = vehiculo.imagen || PLACEHOLDER;
  const disponible = !vehiculo.sold;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 14, overflow: "hidden" }}>
            <div className="position-relative">
              <img src={imgSrc} alt={vehiculo.nombre} style={{ width: "100%", height: 220, objectFit: "cover" }}
                onError={e => { e.target.src = PLACEHOLDER }} />
              <span
                className={`badge-etapa position-absolute top-0 end-0 m-2 ${disponible ? "badge-cierre" : "badge-estado-fallida"}`}
              >
                {disponible ? "Disponible" : "Vendido"}
              </span>
              <button type="button" className="btn-close btn-close-white position-absolute top-0 start-0 m-3"
                onClick={onClose} style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.5))" }} />
            </div>
            <div className="p-4">
              <div className="text-muted-sm">{vehiculo.marca}</div>
              <h4 className="fw-bold mb-1">{vehiculo.nombre}</h4>
              <div className="fw-bold text-primary fs-4 mb-3">${vehiculo.precio.toLocaleString()}</div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="text-muted-sm">Stock</div>
                  <div className="fw-medium">{vehiculo.stock} unidad(es)</div>
                </div>
                <div className="col-6">
                  <div className="text-muted-sm">Vendidos</div>
                  <div className="fw-medium">{vehiculo.sold} vez(es)</div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-primary-brand text-white flex-grow-1"
                  onClick={() => { onClose(); onEdit(vehiculo); }}>
                  <i className="bi bi-pencil me-1" /> Editar
                </button>
                <button className="btn btn-outline-danger"
                  onClick={() => { onClose(); onDelete(vehiculo.id); }}>
                  <i className="bi bi-trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
