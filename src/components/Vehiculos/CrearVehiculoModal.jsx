import React, { useState } from "react";
import { api } from "../../services/api";

export default function CrearVehiculoModal({ show, onClose, onSaved }) {
  const [form, setForm] = useState({ brand: "", model: "", year: "", price: "", imagen: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.brand.trim() || !form.model.trim() || !form.year || !form.price) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (Number(form.year) < 1900 || Number(form.year) > 2100) {
      setError("Año inválido");
      return;
    }
    if (Number(form.price) <= 0) {
      setError("El precio debe ser mayor a cero");
      return;
    }
    setSaving(true);
    try {
      await api.createVehicle({
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        price: Number(form.price),
        imagen: form.imagen.trim() || undefined,
      });
      setForm({ brand: "", model: "", year: "", price: "", imagen: "" });
      onSaved();
      onClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: 14 }}>
            <div className="modal-header border-0 pb-0">
              <div>
                <h5 className="modal-title fw-bold mb-0">Nuevo Vehículo</h5>
                <div className="text-muted-sm">Agrega un modelo al catálogo</div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label small fw-medium">Marca</label>
                  <input className="form-control" name="brand" value={form.brand} onChange={handleChange} placeholder="Toyota" />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-medium">Modelo</label>
                  <input className="form-control" name="model" value={form.model} onChange={handleChange} placeholder="Corolla" />
                </div>
                <div className="col-4">
                  <label className="form-label small fw-medium">Año</label>
                  <input className="form-control" type="number" name="year" value={form.year} onChange={handleChange} placeholder="2026" />
                </div>
                <div className="col-4">
                  <label className="form-label small fw-medium">Precio ($)</label>
                  <input className="form-control" type="number" name="price" value={form.price} onChange={handleChange} placeholder="24990" />
                </div>
                <div className="col-4">
                  <label className="form-label small fw-medium">Stock inicial</label>
                  <input className="form-control" type="number" value="1" disabled />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-medium">URL de imagen</label>
                  <input className="form-control" name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
                  <div className="text-muted small mt-1">Opcional. Si no se provee se mostrará un placeholder.</div>
                </div>
              </div>
              {error && <div className="text-danger small mt-2">{error}</div>}
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>Cancelar</button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit} disabled={saving}>
                {saving ? <>Guardando...</> : "Guardar Vehículo"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
