import React from "react";

export default function Topbar() {
  return (
    <div className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-2 sticky-top">
      <div className="position-relative" style={{ width: 340 }}>
        <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted" />
        <input
          type="text"
          className="form-control ps-5 bg-light border-0"
          placeholder="Buscar prospectos, ventas, vehículos..."
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light position-relative rounded-circle p-2">
          <i className="bi bi-bell" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill ">
            <span className="visually-hidden">notificaciones</span>
          </span>
        </button>
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-circle">JM</div>
          <div className="d-none d-md-block">
            <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Juan Martínez</div>
            <div className="text-muted-sm">Gerente Comercial</div>
          </div>
        </div>
      </div>
    </div>
  );
}
