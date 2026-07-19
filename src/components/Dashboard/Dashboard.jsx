import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../common/PageHeader";
import StatCard from "../common/StatCard";
import SalesFunnel from "./SalesFunnel";
import SalesByVendor from "./SalesByVendor";
import MonthlySales from "./MonthlySales";
import InsuranceByType from "./InsuranceByType";
import { api } from "../../services/api"

export default function Dashboard() {

  const [kpiData, setKpiData] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const data = await api.getMetrics();
      setKpiData({
        totalProspectos: data.total_prospects,
        prospectosDelta: null,
        ventasRealizadas: data.completed_sales,
        ventasDelta: null,
        ventasFallidas: data.failed_sales,
        ventasFallidasDelta: null,
        tasaConversion: data.conversion_rate,
        tasaConversionDelta: null,
        segurosVinculados: data.linked_insurance,
        segurosDelta: null,
        ventasDelMes: (data.completed_sales * 28000).toLocaleString(),
        ventasDelMesDelta: null,
      });
      setFunnel(data.funnel || []);
      setLastUpdate(Date.now());
    } catch (e) {
      console.error('Error fetching metrics:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 15000);
    return () => clearInterval(interval);
  }, [refreshData]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <div className="d-flex align-items-start justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <div className="text-muted-sm mb-1">
            <i className="bi bi-house-door me-1" /> Inicio &gt; Dashboard Comercial
          </div>
          <h4 className="fw-bold mb-0">Dashboard Comercial</h4>
          <div className="text-muted-sm">En tiempo real · Última actualización: {new Date(lastUpdate).toLocaleTimeString()}</div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
            <i className="bi bi-download" /> Exportar
          </button>
          <button className="btn btn-primary-brand text-white d-flex align-items-center gap-2" onClick={refreshData}>
            <i className="bi bi-arrow-clockwise" /> Actualizar
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-people-fill" iconBg="#e6ecff" iconColor="#2952e3" label="Total Prospectos" value={kpiData.totalProspectos.toLocaleString()} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-cart-check-fill" iconBg="#dcf6e8" iconColor="#17b26a" label="Ventas Realizadas" value={kpiData.ventasRealizadas}  />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-x-circle-fill" iconBg="#fde3e1" iconColor="#f04438" label="Ventas Fallidas" value={kpiData.ventasFallidas}  deltaPositive={false} />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-percent" iconBg="#fff2dc" iconColor="#f79009" label="Tasa de Conversión" value={`${kpiData.tasaConversion}%`}  />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-shield-check" iconBg="#f1e8ff" iconColor="#7a5af8" label="Seguros Vinculados" value={kpiData.segurosVinculados}  />
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <StatCard icon="bi-cash-stack" iconBg="#e6ecff" iconColor="#2952e3" label="Ventas del Mes" value={`$${kpiData.ventasDelMes}`}  />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <SalesFunnel funnel={funnel}/>
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
