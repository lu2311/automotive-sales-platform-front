import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import EstadoBadge from "../common/EstadoBadge";
import VentaModal from "./VentaModal";
import { ventas as initialVentas } from "../../data/mockData";

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Ventas() {
  const [lista, setLista] = useState(initialVentas);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (form) => {
    const nueva = {
      id: lista.length ? Math.max(...lista.map((v) => v.id)) + 1 : 1,
      cliente: form.cliente,
      vehiculo: form.vehiculo,
      vendedor: form.vendedor,
      seguro: "—",
      estado: form.estado,
      fecha: form.fecha || new Date().toISOString().slice(0, 10),
      monto: Number(String(form.monto).replace(/[^0-9.]/g, "")) || 0,
    };
    setLista((prev) => [nueva, ...prev]);
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader
        breadcrumb="Ventas"
        title="Ventas"
        subtitle={`${lista.length} ventas registradas`}
        actionLabel="Registrar Venta"
        onAction={() => setShowModal(true)}
      />

      <div className="card-soft p-3">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {["Fecha: Todos", "Vendedor: Todos", "Estado: Todos", "Cliente: Todos", "Vehículo: Todos"].map((f) => (
            <button key={f} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
              {f} <i className="bi bi-chevron-down small" />
            </button>
          ))}
        </div>

        <div className="table-responsive">
          <table className="table table-clean mb-0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Vendedor</th>
                <th>Seguro</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="avatar-circle" style={{ width: 32, height: 32, fontSize: "0.72rem" }}>
                        {initials(v.cliente)}
                      </div>
                      <span className="fw-medium">{v.cliente}</span>
                    </div>
                  </td>
                  <td>{v.vehiculo}</td>
                  <td>{v.vendedor}</td>
                  <td>{v.seguro}</td>
                  <td>
                    <EstadoBadge estado={v.estado} />
                  </td>
                  <td>{v.fecha}</td>
                  <td className="fw-semibold">${v.monto.toLocaleString()}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-light"><i className="bi bi-eye" /></button>
                      <button className="btn btn-sm btn-light"><i className="bi bi-pencil" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VentaModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
    </div>
  );
}
