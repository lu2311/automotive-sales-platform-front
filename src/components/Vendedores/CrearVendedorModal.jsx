import React, { useState } from "react";
import { api } from "../../services/api";

export default function CrearVendedorModal({ show, onClose, onSaved }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Correo electrónico inválido");
      return;
    }
    setSaving(true);
    try {
      await api.createSeller({ name: form.name.trim(), email: form.email.trim() });
      setForm({ name: "", email: "" });
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
                <h5 className="modal-title fw-bold mb-0">Nuevo Vendedor</h5>
                <div className="text-muted-sm">Agrega un asesor comercial</div>
              </div>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-medium">Nombre completo</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Carlos Mendoza" />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-medium">Correo electrónico</label>
                  <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="carlos@autos.pe" />
                </div>
              </div>
              {error && <div className="text-danger small mt-2">{error}</div>}
            </div>
            <div className="modal-footer border-0 pt-0">
              <button className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>Cancelar</button>
              <button className="btn btn-primary-brand text-white" onClick={handleSubmit} disabled={saving}>
                {saving ? <>Guardando...</> : "Guardar Vendedor"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
