import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const emptyForm = {
  prospectId: "",
  vehicleId: "",
  sellerId: "",
  monto: "",
  metodoPago: "Contado",
  fecha: "",
  estado: "Venta realizada",
  motivo: "",
};

export default function VentaModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [prospects, setProspects] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (!show) return;
    Promise.all([
      api.getCatalogs(),
      api.getProspects(),
    ]).then(([cat, pros]) => {
      setSellers(cat.sellers || []);
      setVehicles(cat.vehicles || []);
      setProspects((pros || []).filter(p => p.stage !== 'closed'));
    }).catch(() => { });
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!form.prospectId) errs.prospectId = "Seleccione un cliente";
    if (!form.vehicleId) errs.vehicleId = "Seleccione un vehículo";
    if (!form.sellerId) errs.sellerId = "Seleccione un vendedor";
    if (!form.monto || Number(form.monto) <= 0) errs.monto = "Ingrese un monto válido";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
    setForm(emptyForm);
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0" style={{ borderRadius: 14 }}>
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">Registrar Venta</h5>
                <div className="text-muted-sm">Ingresa los datos de la transacción</div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-medium">Cliente</label>
                  <select className={`form-select ${errors.prospectId ? 'is-invalid' : ''}`} name="prospectId" value={form.prospectId} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {prospects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.vehicle_name}</option>
                    ))}
                  </select>
                  {errors.prospectId && <div className="text-danger small mt-1">{errors.prospectId}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Vehículo</label>
                  <select className={`form-select ${errors.vehicleId ? 'is-invalid' : ''}`} name="vehicleId" value={form.vehicleId} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.year})</option>
                    ))}
                  </select>
                  {errors.vehicleId && <div className="text-danger small mt-1">{errors.vehicleId}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Monto</label>
                  <input className={`form-control ${errors.monto ? 'is-invalid' : ''}`} name="monto" value={form.monto} onChange={handleChange} placeholder="$28,500" />
                  {errors.monto && <div className="text-danger small mt-1">{errors.monto}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Método de pago</label>
                  <select className="form-select" name="metodoPago" value={form.metodoPago} onChange={handleChange}>
                    <option>Contado</option>
                    <option>Financiado</option>
                    <option>Leasing</option>
                  </select>
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Fecha</label>
                  <input className="form-control" type="date" name="fecha" value={form.fecha} onChange={handleChange} />
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Vendedor</label>
                  <select className={`form-select ${errors.sellerId ? 'is-invalid' : ''}`} name="sellerId" value={form.sellerId} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {sellers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {errors.sellerId && <div className="text-danger small mt-1">{errors.sellerId}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Estado</label>
                  <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
                    <option>Venta realizada</option>
                    <option>Venta fallida</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Motivo (si fallida)</label>
                  <input className="form-control" name="motivo" value={form.motivo} onChange={handleChange} placeholder="Precio fuera de presupuesto..." />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
