import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const motivosPerdida = [
  "Precio muy alto",
  "Prefirió otra marca",
  "Financiamiento no aprobado",
  "Cambió de opinión",
  "Ya compró en otro lado",
  "Cliente no responde",
  "Otro",
];

export default function CierreModal({ show, onClose, onSave, prospecto, isSaving }) {
  const [resultado, setResultado] = useState("won");
  const [vehicleId, setVehicleId] = useState("");
  const [monto, setMonto] = useState("");
  const [lossReason, setLossReason] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [errors, setErrors] = useState({});

  const reset = () => {
    setResultado("won");
    setVehicleId("");
    setMonto("");
    setLossReason("");
    setErrors({});
  };

  useEffect(() => {
    if (!show) return;
    reset();
    api.getCatalogs().then(data => {
      setVehiculos(data?.vehicles || data?.vehiculos || []);
    }).catch(() => {});
  }, [show]);

  if (!show) return null;

  const validate = () => {
    const errs = {};
    if (resultado === "won") {
      if (!vehicleId) errs.vehicleId = "Seleccione un vehículo";
      if (!monto || Number(monto) <= 0) errs.monto = "El monto debe ser mayor a cero";
    } else {
      if (!lossReason || !lossReason.trim()) errs.lossReason = "Seleccione un motivo de pérdida";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      resultado,
      vehicleId: resultado === "won" ? vehicleId : undefined,
      monto: resultado === "won" ? monto : undefined,
      loss_reason: resultado === "lost" ? lossReason : undefined,
    });
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 14 }}>
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">Cerrar Prospecto</h5>
                <div className="text-muted-sm">{prospecto?.nombre} - {prospecto?.vehiculo}</div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-medium">Resultado</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="r-won" checked={resultado === "won"} onChange={() => setResultado("won")} />
                      <label className="form-check-label" htmlFor="r-won">Venta efectiva</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" id="r-lost" checked={resultado === "lost"} onChange={() => setResultado("lost")} />
                      <label className="form-check-label" htmlFor="r-lost">Venta fallida</label>
                    </div>
                  </div>
                </div>

                {resultado === "won" && (
                  <>
                    <div className="col-6">
                      <label className="form-label small fw-medium">Vehículo</label>
                      <select className={`form-select ${errors.vehicleId ? 'is-invalid' : ''}`}
                        value={vehicleId} onChange={e => { setVehicleId(e.target.value); setErrors(p => ({...p, vehicleId: undefined})); }}>
                        <option value="">Seleccionar...</option>
                        {vehiculos.filter(v => !v.sold).map(v => (
                          <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.year})</option>
                        ))}
                        {vehiculos.filter(v => v.sold).map(v => (
                          <option key={v.id} value={v.id} disabled>{v.brand} {v.model} ({v.year}) — Vendido</option>
                        ))}
                      </select>
                      {errors.vehicleId && <div className="text-danger small mt-1">{errors.vehicleId}</div>}
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-medium">Monto ($)</label>
                      <input className={`form-control ${errors.monto ? 'is-invalid' : ''}`}
                        type="number" value={monto} onChange={e => { setMonto(e.target.value); setErrors(p => ({...p, monto: undefined})); }} placeholder="25000" />
                      {errors.monto && <div className="text-danger small mt-1">{errors.monto}</div>}
                    </div>
                  </>
                )}

                {resultado === "lost" && (
                  <div className="col-12">
                    <label className="form-label small fw-medium">Motivo de pérdida</label>
                    <select className={`form-select ${errors.lossReason ? 'is-invalid' : ''}`}
                      value={lossReason} onChange={e => { setLossReason(e.target.value); setErrors(p => ({...p, lossReason: undefined})); }}>
                      <option value="">Seleccionar...</option>
                      {motivosPerdida.map(m => <option key={m}>{m}</option>)}
                    </select>
                    {errors.lossReason && <div className="text-danger small mt-1">{errors.lossReason}</div>}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={isSaving}>Cancelar</button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? <>Guardando...</> : "Registrar Cierre"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
