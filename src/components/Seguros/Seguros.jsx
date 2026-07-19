import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../common/PageHeader";
import EstadoBadge from "../common/EstadoBadge";
import { api } from "../../services/api";
import SeguroModal from "./SeguroModal";

export default function Seguros() {

  const [detalle, setDetalle] = useState([]);
  const [resumen, setResumen] = useState({ prospectados: 0, vendidos: 0, primaEsperada: 0, primaReal: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const load = useCallback(async () => {
    const insStatusLabel = { prospected: "Prospectado", sold: "Venta realizada" };
    try {
      const data = await api.getInsurance();
      setDetalle(data.map(i => ({
        id: i.id,
        cliente: i.prospect_name,
        tipo: i.type,
        primaEsperada: i.expected_premium,
        primaReal: i.actual_premium,
        estado: insStatusLabel[i.status] || i.status,
      })));
      setResumen({
        prospectados: data.filter(i => i.status === 'prospected').length,
        vendidos: data.filter(i => i.status === 'sold').length,
        primaEsperada: data.reduce((s, i) => s + (i.expected_premium || 0), 0),
        primaReal: data.reduce((s, i) => s + (i.actual_premium || 0), 0),
      });
    } catch (e) {
      console.error('Error loading insurance:', e);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);


  const handleSave = async (form) => {
    try {
      await api.createInsurance({
        sale_id: Number(form.saleId),
        type: form.tipo,
        expected_premium: Number(form.primaEsperada),
        actual_premium: form.primaReal ? Number(form.primaReal) : null,
        status: form.estado === "Vendido" ? "sold" : "prospected",
      });
      await load();
      setShowModal(false);
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

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
            <div className="fs-4 fw-bold">{resumen.prospectados}</div>
            <div className="text-muted-sm">Seguros Prospectados</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#dcf6e8", color: "#17b26a" }}>
              <i className="bi bi-check-circle" />
            </div>
            <div className="fs-4 fw-bold">{resumen.vendidos}</div>
            <div className="text-muted-sm">Seguros Vendidos</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#fff2dc", color: "#f79009" }}>
              <i className="bi bi-currency-dollar" />
            </div>
            <div className="fs-4 fw-bold">{resumen.primaEsperada.toLocaleString()}</div>
            <div className="text-muted-sm">Prima Esperada</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-soft p-3 h-100">
            <div className="stat-icon mb-2" style={{ backgroundColor: "#f1e8ff", color: "#7a5af8" }}>
              <i className="bi bi-graph-up" />
            </div>
            <div className="fs-4 fw-bold">${resumen.primaReal}</div>
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
              {detalle.map((s) => (
                <tr key={s.id}>
                  <td className="fw-medium">{s.cliente}</td>
                  <td>{s.vehicle_name || "—"}</td>
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
                  <td className="text-muted-sm">{s.created_at ? s.created_at.slice(0, 10) : "—"}</td>
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
