import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import EstadoBadge from "../common/EstadoBadge";
import VentaModal from "./VentaModal";
import { api } from "../../services/api";

const statusLabel = { completed: "Venta realizada", failed: "Venta fallida" };

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Ventas() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailSale, setDetailSale] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});


  const load = async () => {
    try {
      const data = await api.getSales();
      setLista(data.map(s => ({
        id: s.id,
        cliente: s.prospect_name,
        vehiculo: s.vehicle_name,
        vendedor: s.seller_name,
        seguro: s.has_insurance === "Sí" ? "Sí" : "—",
        estado: statusLabel[s.status] || s.status,
        fecha: s.created_at ? s.created_at.slice(0, 10) : "",
        monto: s.amount,
      })));
    } catch (e) {
      console.error('Error loading sales:', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    try {
      await api.createSale({
        prospect_id: Number(form.prospectId),
        vehicle_id: Number(form.vehicleId),
        seller_id: Number(form.sellerId),
        amount: Number(String(form.monto).replace(/[^0-9.]/g, "")),
        status: form.estado === "Venta fallida" ? "failed" : "completed",
        loss_reason: form.motivo || undefined,
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
        breadcrumb="Ventas"
        title="Ventas"
        subtitle={`${lista.length} ventas registradas`}
        actionLabel="Registrar Venta"
        onAction={() => setShowModal(true)}
      />

      <div className="card-soft p-3">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {["Fecha: Todos", "Vendedor: Todos", "Estado: Todos", "Cliente: Todos", "Vehículo: Todos"].map((f) => {
            const isActive = activeFilters[f] || false;
            return (
              <button key={f}
                className={`btn btn-sm ${isActive ? 'btn-primary-brand text-white' : 'btn-outline-secondary'} d-flex align-items-center gap-1`}
                onClick={() => setActiveFilters(p => ({...p, [f]: !p[f]}))}>
                {f} <i className="bi bi-chevron-down small" />
              </button>
            );
          })}
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
                      <button className="btn btn-sm btn-light" onClick={() => { setDetailSale(v); setShowDetail(true); }}><i className="bi bi-eye" /></button>
                      <button className="btn btn-sm btn-light" onClick={() => alert('La edición de ventas no está disponible directamente. Cancele y registre una nueva venta si es necesario.')}><i className="bi bi-pencil" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

{showDetail && detailSale && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0" style={{ borderRadius: 14 }}>
                <div className="modal-header border-0 pb-0">
                  <div>
                    <h5 className="modal-title fw-bold mb-0">Detalle de Venta</h5>
                    <div className="text-muted-sm">{detailSale.cliente} — {detailSale.vehiculo}</div>
                  </div>
                  <button type="button" className="btn-close" onClick={() => setShowDetail(false)} />
                </div>
                <div className="modal-body">
                  <table className="table table-sm">
                    <tbody>
                      <tr><td className="fw-medium">Cliente</td><td>{detailSale.cliente}</td></tr>
                      <tr><td className="fw-medium">Vehículo</td><td>{detailSale.vehiculo}</td></tr>
                      <tr><td className="fw-medium">Vendedor</td><td>{detailSale.vendedor}</td></tr>
                      <tr><td className="fw-medium">Monto</td><td>${detailSale.monto?.toLocaleString()}</td></tr>
                      <tr><td className="fw-medium">Estado</td><td><EstadoBadge estado={detailSale.estado} /></td></tr>
                      <tr><td className="fw-medium">Fecha</td><td>{detailSale.fecha}</td></tr>
                      <tr><td className="fw-medium">Seguro</td><td>{detailSale.seguro || "Sin asignar"}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button className="btn btn-outline-secondary" onClick={() => setShowDetail(false)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}

      <VentaModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
    </div>
  );
}
