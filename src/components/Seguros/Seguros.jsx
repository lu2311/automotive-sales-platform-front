import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import EstadoBadge from "../common/EstadoBadge";
import { seguros } from "../../data/mockData";
import SeguroModal from "./SeguroModal";

export default function Seguros() {

  const [data, setData] = useState(seguros);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (form) => {
    const nuevo = {
      id: data.detalle.length ? Math.max(...data.detalle.map(s => s.id)) + 1 : 1,
      cliente: form.cliente,
      vehiculo: form.vehiculo,
      tipo: form.tipo,
      primaEsperada: Number(form.primaEsperada),
      primaReal: form.primaReal ? Number(form.primaReal) : null,
      estado: form.estado === "Vendido" ? "Venta realizada" : "Prospectado",
      fecha: new Date().toISOString().slice(0, 10),
    };
    setData(prev => ({
      ...prev,
      detalle: [nuevo, ...prev.detalle],
      prospectados: form.estado === "Prospectado" ? prev.prospectados + 1 : prev.prospectados,
      vendidos: form.estado === "Vendido" ? prev.vendidos + 1 : prev.vendidos,
    }));
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader
        breadcrumb="Seguros"
        title="Seguros"
        subtitle="Pólizas asociadas a ventas"
        actionLabel="Asociar Seguro"
        onAction={() => setShowModal(true)}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#e6ecff", color: "#2952e3" }}>
              <i className="bi bi-circle" />
            </div>
            <div className="fs-4 fw-bold">{data.prospectados}</div>
            <div className="text-muted-sm">Seguros Prospectados</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#dcf6e8", color: "#17b26a" }}>
              <i className="bi bi-check-circle" />
            </div>
            <div className="fs-4 fw-bold">{data.vendidos}</div>
            <div className="text-muted-sm">Seguros Vendidos</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#fff2dc", color: "#f79009" }}>
              <i className="bi bi-currency-dollar" />
            </div>
            <div className="fs-4 fw-bold">${data.primaEsperada}</div>
            <div className="text-muted-sm">Prima Esperada</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#f1e8ff", color: "#7a5af8" }}>
              <i className="bi bi-graph-up" />
            </div>
            <div className="fs-4 fw-bold">${data.primaReal}</div>
            <div className="text-muted-sm">Prima Real</div>
          </div>
        </div>
      </div>

      <div className="card-soft p-3">
        <div className="table-responsive">
          <table className="table table-clean mb-0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Tipo de Seguro</th>
                <th>Prima Esperada</th>
                <th>Prima Real</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.detalle.map((s) => (
                <tr key={s.id}>
                  <td className="fw-medium">{s.cliente}</td>
                  <td>{s.vehiculo}</td>
                  <td>
                    <span className="badge-etapa badge-prospeccion">{s.tipo}</span>
                  </td>
                  <td>${s.primaEsperada.toLocaleString()}</td>
                  <td className="fw-semibold text-success">
                    {s.primaReal ? `$${s.primaReal.toLocaleString()}` : "—"}
                  </td>
                  <td>
                    <EstadoBadge estado={s.estado} />
                  </td>
                  <td>{s.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SeguroModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
