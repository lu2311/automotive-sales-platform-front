import React, { useState } from "react";
import { ventas, vendedores } from "../../data/mockData";

const tiposSeguro = ["Todo Riesgo", "Responsabilidad Civil", "Robo y Hurto", "Daños Parciales"];

const emptyForm = {
  cliente: "", vehiculo: "", tipo: tiposSeguro[0],
  primaEsperada: "", primaReal: "", estado: "Prospectado",
};

export default function SeguroModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updates = { [name]: value };
    if (name === "cliente") {
      const venta = ventas.find(v => v.cliente === value);
      updates.vehiculo = venta ? venta.vehiculo : "";
    }
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
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
                  <label className="form-label small fw-medium">Cliente</label>
                  <select className="form-select" name="cliente" value={form.cliente} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {ventas.filter(v => v.estado === "Venta realizada").map(v => (
                      <option key={v.id}>{v.cliente}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Vehículo</label>
                  <input className="form-control" name="vehiculo" value={form.vehiculo} readOnly />
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
                  <input className="form-control" name="primaEsperada" type="number" value={form.primaEsperada} onChange={handleChange} placeholder="1200" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Prima real ($)</label>
                  <input className="form-control" name="primaReal" type="number" value={form.primaReal} onChange={handleChange} placeholder="1150 (opcional)" />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose}>Cancelar</button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit}>Guardar Seguro</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}