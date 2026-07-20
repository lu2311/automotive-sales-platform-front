import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const emptyForm = {
  nombre: "", apellido: "", email: "", telefono: "",
  vehicle_id: "", presupuesto: "", observaciones: "",
  etapa: "Prospección", vendedorId: "",
  motivo: "",
};

export default function ProspectoModal({ show, onClose, onSave, initialData }) {
  const [form, setForm] = useState(emptyForm);
  const [sellers, setSellers] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.getCatalogs().then(res => {
      setSellers(res.sellers || []);
      setVehiculos(res.vehicles || []);
    }).catch(() => { });
  }, []);

  useEffect(() => {
    if (initialData) {
      const [nombre, ...rest] = initialData.nombre.split(" ");
      setForm({
        nombre: nombre || "",
        apellido: rest.join(" ") || "",
        email: initialData.email || "",
        telefono: initialData.telefono || "",
        vehicle_id: String(initialData.vehicle_id || ""),
        presupuesto: "",
        observaciones: "",
        etapa: initialData.etapa || "Prospección",
        vendedorId: String(initialData.vendedorId || ""),
        motivo: "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, show]);


  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "Ingrese el nombre";
    if (!form.email.trim()) errs.email = "Ingrese el correo";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Correo inválido";
    if (!form.telefono.trim()) errs.telefono = "Ingrese el teléfono";
    else if (!/^\+?\d{7,15}$/.test(form.telefono)) errs.telefono = "Teléfono inválido (7-15 dígitos)";
    if (!form.vendedorId) errs.vendedorId = "Seleccione un vendedor";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0" style={{ borderRadius: 14 }}>
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">
                  {initialData ? "Editar Prospecto" : "Nuevo Prospecto"}
                </h5>
                <div className="text-muted-sm">
                  {initialData ? "Modifica los datos del cliente" : "Completa los datos del cliente potencial"}
                </div>

              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-medium">Nombre</label>
                  <input className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ricardo" />
                  {errors.nombre && <div className="text-danger small mt-1">{errors.nombre}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Apellido</label>
                  <input className="form-control" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Flores" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Correo electrónico</label>
                  <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="email" name="email" value={form.email} onChange={handleChange} placeholder="cliente@email.com" />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Teléfono</label>
                  <input className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} name="telefono" value={form.telefono} onChange={handleChange} placeholder="+573000000000" />
                  {errors.telefono && <div className="text-danger small mt-1">{errors.telefono}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Vehículo de interés</label>
                  <select className="form-select" name="vehicle_id" value={form.vehicle_id} onChange={handleChange}>
                    <option value="">Seleccionar...</option>
                    {vehiculos.map(v => (
                      <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.year})</option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Presupuesto</label>
                  <input className="form-control" name="presupuesto" value={form.presupuesto} onChange={handleChange} placeholder="$30,000" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-medium">Observaciones</label>
                  <textarea className="form-control" rows="2" name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Notas adicionales sobre el prospecto..." />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Etapa del embudo</label>
                  <select className="form-select" name="etapa" value={form.etapa} onChange={handleChange}>
                    <option>Prospección</option>
                    <option>Calificación</option>
                    <option>Negociación</option>
                    <option>Cierre</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Vendedor asignado</label>
                  <select className={`form-select ${errors.vendedorId ? 'is-invalid' : ''}`} name="vendedorId" value={form.vendedorId} onChange={handleChange}>
  <option value="">Seleccionar...</option>
  {sellers.map((s) => (
    <option key={s.id} value={s.id}>{s.name}</option>
  ))}
</select>
                  {errors.vendedorId && <div className="text-danger small mt-1">{errors.vendedorId}</div>}
                  {form.etapa === "Cierre" && (
                    <div className="col-12">
                      <label className="form-label small fw-medium">Motivo (si es venta fallida)</label>
                      <input className="form-control" name="motivo" value={form.motivo}
                        onChange={handleChange} placeholder="Presupuesto, competencia..." />
                    </div>
                  )}

                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit}>
                {initialData ? "Guardar Cambios" : "Guardar Prospecto"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
