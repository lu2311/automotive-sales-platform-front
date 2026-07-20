import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const tiposSeguro = ["Todo Riesgo", "Responsabilidad Civil", "Robo y Hurto", "Daños Parciales"];

const emptyForm = {
  saleId: "", tipo: tiposSeguro[0],
  primaEsperada: "", primaReal: "", estado: "Prospectado",
};

export default function SeguroModal({ show, onClose, onSave, prefilledSaleId, isSaving }) {
  const [form, setForm] = useState(emptyForm);
  const [completedSales, setCompletedSales] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!show) return;
    api.getSales().then(data => {
      setCompletedSales((data || []).filter(s => s.status === 'completed'));
    }).catch(() => { });
    if (prefilledSaleId) {
      setForm(prev => ({ ...prev, saleId: prefilledSaleId }));
    }
  }, [show, prefilledSaleId]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!form.saleId) errs.saleId = "Seleccione una venta";
    if (!form.primaEsperada || Number(form.primaEsperada) < 0) errs.primaEsperada = "Ingrese una prima válida (≥ 0)";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
    setForm(emptyForm);
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 14 }}>
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">Asociar Seguro</h5>
                <div className="text-muted-sm">Vincular póliza a una venta</div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-medium">Venta</label>
                  <select className={`form-select ${errors.saleId ? 'is-invalid' : ''}`} name="saleId" value={form.saleId} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {completedSales.map(v => (
                      <option key={v.id} value={v.id}>{v.prospect_name} — {v.vehicle_name}</option>
                    ))}
                  </select>
                  {errors.saleId && <div className="text-danger small mt-1">{errors.saleId}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label small fw-medium">Tipo de seguro</label>
                  <select className="form-select" name="tipo" value={form.tipo} onChange={handleChange}>
                    {tiposSeguro.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Estado</label>
                  <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
                    <option>Prospectado</option>
                    <option>Vendido</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Prima esperada ($)</label>
                  <input className={`form-control ${errors.primaEsperada ? 'is-invalid' : ''}`} name="primaEsperada" type="number" value={form.primaEsperada} onChange={handleChange} placeholder="1200" />
                  {errors.primaEsperada && <div className="text-danger small mt-1">{errors.primaEsperada}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Prima real ($)</label>
                  <input className="form-control" name="primaReal" type="number" value={form.primaReal} onChange={handleChange} placeholder="1150 (opcional)" />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={isSaving}>Cancelar</button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Seguro"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}