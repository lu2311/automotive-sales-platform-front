import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Prospectos from "./components/Prospectos/Prospectos";
import Ventas from "./components/Ventas/Ventas";
import Seguros from "./components/Seguros/Seguros";
import Vehiculos from "./components/Vehiculos/Vehiculos";
import Vendedores from "./components/Vendedores/Vendedores";
import Automatizaciones from "./components/Automatizaciones/Automatizaciones";
import Reportes from "./components/Reportes/Reportes";
import Configuracion from "./components/Configuracion/Configuracion";
import Rendimiento from "./components/Rendimiento/Rendimiento";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <div className="page-body">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prospectos" element={<Prospectos />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/seguros" element={<Seguros />} />
              <Route path="/vehiculos" element={<Vehiculos />} />
              <Route path="/vendedores" element={<Vendedores />} />
              <Route path="/automatizaciones" element={<Automatizaciones />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="/rendimiento" element={<Rendimiento />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
