import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../common/PageHeader";
import StatCard from "../common/StatCard";
import SalesFunnel from "./SalesFunnel";
import SalesByVendor from "./SalesByVendor";
import MonthlySales from "./MonthlySales";
import InsuranceByType from "./InsuranceByType";
import { api } from "../../services/api"
import exportCSV from "../../utils/exportCSV";

export default function Dashboard() {

  const [kpiData, setKpiData] = useState(null);
  const [funnel, setFunnel] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const refreshData = useCallback(async () => {
    try {
      const data = await api.getMetrics();
      const ventasMonto = data.ventas_del_mes ?? (data.completed_sales * 28000);
      setKpiData({
        totalProspectos: data.total_prospects,
        activeProspectos: data.active_prospects,
        prospectosDelta: null,
        ventasRealizadas: data.completed_sales,
        ventasDelta: null,
        ventasFallidas: data.failed_sales,
        ventasFallidasDelta: null,
        tasaConversion: data.conversion_rate,
        tasaConversionDelta: null,
        segurosVinculados: data.linked_insurance,
        segurosDelta: null,
        ventasDelMes: ventasMonto.toLocaleString('en-US', {minimumFractionDigits: 0}),
        ventasDelMesDelta: null,
      });
      setFunnel(data.funnel || []);
      setMonthlySales(data.monthly_sales || []);
      setInsuranceTypes(data.insurance_types || []);
      setLastUpdate(Date.now());
      setError(false);
    } catch (e) {
      console.error('Error fetching metrics:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExport = () => {
    exportCSV('dashboard-' + new Date().toISOString().slice(0, 10) + '.csv',
      ['Indicador', 'Valor'],
      [
        ['Total Prospectos', kpiData?.totalProspectos ?? 0],
        ['Prospectos Activos', kpiData?.activeProspectos ?? 0],
        ['Ventas Realizadas', kpiData?.ventasRealizadas ?? 0],
        ['Ventas Fallidas', kpiData?.ventasFallidas ?? 0],
        ['Tasa de Conversión', (kpiData?.tasaConversion ?? 0) + '%'],
        ['Seguros Vinculados', kpiData?.segurosVinculados ?? 0],
        ['Ventas del Mes', '$' + (kpiData?.ventasDelMes ?? '0')],
      ].map(r => ({ Indicador: r[0], Valor: r[1] }))
    );
  };


  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 15000);
    return () => clearInterval(interval);
  }, [refreshData]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  if (error || !kpiData) {
    return (
      <div className="alert alert-danger d-flex align-items-center justify-content-between">
        <span>No se pudieron cargar las métricas del dashboard.</span>
        <button className="btn btn-sm btn-outline-danger" onClick={refreshData}>
          <i className="bi bi-arrow-clockwise me-1" /> Reintentar
        </button>
      </div>
    );
  }

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
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={handleExport}>
            <i className="bi bi-download" /> Exportar
          </button>

          <button className="btn btn-primary-brand text-white d-flex align-items-center gap-2" onClick={refreshData}>
            <i className="bi bi-arrow-clockwise" /> Actualizar
          </button>
        </div>
      </div>

      <div id="dashboard-content">
        <div className="row g-3 mb-3">
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-people-fill" iconBg="#e6ecff" iconColor="#2952e3" label="Total Prospectos" value={kpiData.totalProspectos.toLocaleString()} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-cart-check-fill" iconBg="#dcf6e8" iconColor="#17b26a" label="Ventas Realizadas" value={kpiData.ventasRealizadas} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-x-circle-fill" iconBg="#fde3e1" iconColor="#f04438" label="Ventas Fallidas" value={kpiData.ventasFallidas} deltaPositive={false} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-percent" iconBg="#fff2dc" iconColor="#f79009" label="Tasa de Conversión" value={`${kpiData.tasaConversion}%`} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-shield-check" iconBg="#f1e8ff" iconColor="#7a5af8" label="Seguros Vinculados" value={kpiData.segurosVinculados} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <StatCard icon="bi-cash-stack" iconBg="#e6ecff" iconColor="#2952e3" label="Ventas del Mes" value={`$${kpiData.ventasDelMes}`} />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-lg-6">
            <SalesFunnel funnel={funnel} />
          </div>
          <div className="col-lg-6">
            <SalesByVendor />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-6">
            <MonthlySales data={monthlySales} />
          </div>
          <div className="col-lg-6">
            <InsuranceByType data={insuranceTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}