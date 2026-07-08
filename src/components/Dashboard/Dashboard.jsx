import React from "react";
import PageHeader from "../common/PageHeader";
import StatCard from "../common/StatCard";
import SalesFunnel from "./SalesFunnel";
import SalesByVendor from "./SalesByVendor";
import MonthlySales from "./MonthlySales";
import InsuranceByType from "./InsuranceByType";
import { kpis } from "../../data/mockData";

export default function Dashboard() {
  return (
    <div>
      <div className="d-flex align-items-start justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <div className="text-muted-sm mb-1">
            <i className="bi bi-house-door me-1" /> Inicio &gt; Dashboard Comercial
          </div>
          <h4 className="fw-bold mb-0">Dashboard Comercial</h4>
          <div className="text-muted-sm">Noviembre 2024 · Actualizado hace 3 minutos</div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <i className="bi bi-download" /> Exportar
          </button>
          <button className="btn btn-primary-brand text-white d-flex align-items-center gap-2">
            <i className="bi bi-arrow-clockwise" /> Actualizar
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-people-fill" iconBg="#e6ecff" iconColor="#2952e3" label="Total Prospectos" value={kpis.totalProspectos.toLocaleString()} delta={kpis.prospectosDelta} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-cart-check-fill" iconBg="#dcf6e8" iconColor="#17b26a" label="Ventas Realizadas" value={kpis.ventasRealizadas} delta={kpis.ventasDelta} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-x-circle-fill" iconBg="#fde3e1" iconColor="#f04438" label="Ventas Fallidas" value={kpis.ventasFallidas} delta={kpis.ventasFallidasDelta} deltaPositive={false} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-percent" iconBg="#fff2dc" iconColor="#f79009" label="Tasa de Conversión" value={`${kpis.tasaConversion}%`} delta={kpis.tasaConversionDelta} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-shield-check" iconBg="#f1e8ff" iconColor="#7a5af8" label="Seguros Vinculados" value={kpis.segurosVinculados} delta={kpis.segurosDelta} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-cash-stack" iconBg="#e6ecff" iconColor="#2952e3" label="Ventas del Mes" value={`$${kpis.ventasDelMes}`} delta={kpis.ventasDelMesDelta} />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <SalesFunnel />
        </div>
        <div className="col-lg-6">
          <SalesByVendor />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <MonthlySales />
        </div>
        <div className="col-lg-6">
          <InsuranceByType />
        </div>
      </div>
    </div>
  );
}
