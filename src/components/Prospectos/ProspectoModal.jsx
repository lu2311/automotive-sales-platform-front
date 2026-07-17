import React, { useState, useEffect } from "react";

const vendedoresOptions = ["Carlos Mendoza", "Ana García", "Luis Rodríguez", "María Soto", "Pedro Leal", "Sofía Vargas"];


const emptyForm = {
  nombre: "", apellido: "", email: "", telefono: "",
  vehiculoInteres: "", presupuesto: "", observaciones: "",
  etapa: "Prospección", vendedor: vendedoresOptions[0],
  motivo: "",
};


export default function ProspectoModal({ show, onClose, onSave, initialData }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      const [nombre, ...rest] = initialData.nombre.split(" ");
      setForm({
        nombre: nombre || "",
        apellido: rest.join(" ") || "",
        email: initialData.email || "",
        telefono: initialData.telefono || "",
        vehiculoInteres: initialData.vehiculo || "",
        presupuesto: "",
        observaciones: "",
        etapa: initialData.etapa || "Prospección",
        vendedor: initialData.vendedor || vendedoresOptions[0],
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
  };

  const handleSubmit = () => {
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
                  <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ricardo" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Apellido</label>
                  <input className="form-control" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Flores" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Correo electrónico</label>
                  <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="cliente@email.com" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Teléfono</label>
                  <input className="form-control" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+57 300 000 0000" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Vehículo de interés</label>
                  <input className="form-control" name="vehiculoInteres" value={form.vehiculoInteres} onChange={handleChange} placeholder="Toyota Corolla 2024" />
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
                  <select className="form-select" name="vendedor" value={form.vendedor} onChange={handleChange}>
                    {vendedoresOptions.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
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
