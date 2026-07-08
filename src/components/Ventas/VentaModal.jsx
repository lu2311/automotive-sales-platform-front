import React, { useState } from "react";

const vendedoresOptions = ["Carlos Mendoza", "Ana García", "Luis Rodríguez", "María Soto", "Pedro Leal", "Sofía Vargas"];

const emptyForm = {
  cliente: "",
  vehiculo: "",
  monto: "",
  metodoPago: "Contado",
  fecha: "",
  vendedor: vendedoresOptions[0],
  estado: "Venta realizada",
  motivo: "",
};

export default function VentaModal({ show, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
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
                  <input className="form-control" name="cliente" value={form.cliente} onChange={handleChange} placeholder="Ricardo Flores" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Vehículo</label>
                  <input className="form-control" name="vehiculo" value={form.vehiculo} onChange={handleChange} placeholder="Toyota Corolla 2024" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Monto</label>
                  <input className="form-control" name="monto" value={form.monto} onChange={handleChange} placeholder="$28,500" />
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
                  <select className="form-select" name="vendedor" value={form.vendedor} onChange={handleChange}>
                    {vendedoresOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Estado</label>
                  <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
                    <option>Venta realizada</option>
                    <option>En negociación</option>
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
