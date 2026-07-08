import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import { usuarioActual } from "../../data/mockData";

export default function Configuracion() {
  const [empresa, setEmpresa] = useState({ nombre: "", ruc: "", direccion: "", telefono: "" });
  const [notif, setNotif] = useState({ email: "", webhook: "", frecuencia: "", canal: "" });
  const [perfil, setPerfil] = useState({ nombre: usuarioActual.nombre, email: "juan@automotriz.com", password: "********" });

  return (
    <div>
      <PageHeader breadcrumb="Configuración" title="Configuración" subtitle="Preferencias del sistema" />

      <div className="row g-3">
        <div className="col-lg-8 d-flex flex-column gap-3">
          <div className="card-soft p-3">
            <div className="fw-semibold mb-3">Información de la Empresa</div>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small fw-medium">Nombre de la empresa</label>
                <input className="form-control" value={empresa.nombre} onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">RUC / NIT</label>
                <input className="form-control" value={empresa.ruc} onChange={(e) => setEmpresa({ ...empresa, ruc: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">Dirección</label>
                <input className="form-control" value={empresa.direccion} onChange={(e) => setEmpresa({ ...empresa, direccion: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">Teléfono</label>
                <input className="form-control" value={empresa.telefono} onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })} />
              </div>
            </div>
            <button className="btn btn-primary-brand text-white mt-3">Guardar cambios</button>
          </div>

          <div className="card-soft p-3">
            <div className="fw-semibold mb-3">Notificaciones</div>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small fw-medium">Email de notificaciones</label>
                <input className="form-control" value={notif.email} onChange={(e) => setNotif({ ...notif, email: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">Webhook URL</label>
                <input className="form-control" value={notif.webhook} onChange={(e) => setNotif({ ...notif, webhook: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">Frecuencia de reportes</label>
                <input className="form-control" value={notif.frecuencia} onChange={(e) => setNotif({ ...notif, frecuencia: e.target.value })} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-medium">Canal preferido</label>
                <input className="form-control" value={notif.canal} onChange={(e) => setNotif({ ...notif, canal: e.target.value })} />
              </div>
            </div>
            <button className="btn btn-primary-brand text-white mt-3">Guardar cambios</button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-soft p-3 text-center">
            <div className="fw-semibold mb-3 text-start">Perfil de Usuario</div>
            <div className="avatar-circle mx-auto mb-2" style={{ width: 64, height: 64, fontSize: "1.3rem" }}>
              JM
            </div>
            <div className="fw-semibold">{usuarioActual.nombre}</div>
            <div className="text-muted-sm mb-3">{usuarioActual.rol}</div>

            <div className="text-start">
              <label className="form-label small fw-medium">Nombre completo</label>
              <input className="form-control mb-2" value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} />
              <label className="form-label small fw-medium">Email</label>
              <input className="form-control mb-2" value={perfil.email} onChange={(e) => setPerfil({ ...perfil, email: e.target.value })} />
              <label className="form-label small fw-medium">Contraseña</label>
              <input type="password" className="form-control mb-3" value={perfil.password} onChange={(e) => setPerfil({ ...perfil, password: e.target.value })} />
            </div>
            <button className="btn btn-primary-brand text-white w-100">Actualizar perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
}
