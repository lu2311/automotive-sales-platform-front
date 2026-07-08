import React from "react";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { to: "/", label: "Dashboard", icon: "bi-grid-1x2-fill", end: true },
  { to: "/prospectos", label: "Prospectos", icon: "bi-people-fill" },
  { to: "/ventas", label: "Ventas", icon: "bi-cart-check-fill" },
  { to: "/seguros", label: "Seguros", icon: "bi-shield-check" },
  { to: "/vehiculos", label: "Vehículos", icon: "bi-truck-front-fill" },
  { to: "/vendedores", label: "Vendedores", icon: "bi-person-badge-fill" },
  { to: "/automatizaciones", label: "Automatizaciones", icon: "bi-lightning-charge-fill" },
];

const analysisLinks = [
  { to: "/reportes", label: "Reportes", icon: "bi-bar-chart-fill" },
  { to: "/configuracion", label: "Configuración", icon: "bi-gear-fill" },
];

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column position-fixed top-0 start-0 vh-100"
      style={{ width: 240, backgroundColor: "var(--sidebar-bg)", zIndex: 1030 }}
    >
      <div className="d-flex align-items-center gap-2 px-3 py-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{ width: 34, height: 34, background: "var(--primary)" }}
        >
          <i className="bi bi-car-front-fill text-white" />
        </div>
        <div>
          <div className="text-white fw-semibold" style={{ fontSize: "0.95rem" }}>
            AutoMotriz
          </div>
          <div className="text-muted-sm" style={{ color: "#8791ba" }}>
            CRM Pro
          </div>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto pb-3">
        <div className="nav-section-label">Menú Principal</div>
        <nav className="d-flex flex-column">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => "nav-item-crm" + (isActive ? " active" : "")}
            >
              <i className={`bi ${link.icon}`} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="nav-section-label">Análisis</div>
        <nav className="d-flex flex-column">
          {analysisLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => "nav-item-crm" + (isActive ? " active" : "")}
            >
              <i className={`bi ${link.icon}`} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="d-flex align-items-center gap-2 px-3 py-3 border-top" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="avatar-circle">JM</div>
        <div className="text-truncate">
          <div className="text-white text-truncate" style={{ fontSize: "0.82rem" }}>
            Juan Martínez
          </div>
          <div className="text-truncate" style={{ fontSize: "0.72rem", color: "#8791ba" }}>
            Gerente Comercial
          </div>
        </div>
      </div>
    </div>
  );
}
