import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import VehiculoCard from "./VehiculoCard";
import CrearVehiculoModal from "./CrearVehiculoModal";
import { api } from "../../services/api";

export default function Vehiculos() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setLoading(true);
    api.getCatalogs().then(res => {
      setLista((res.vehicles || []).map(v => ({
        id: v.id,
        nombre: `${v.brand} ${v.model} ${v.year}`,
        marca: v.brand,
        precio: v.price,
        stock: Math.max(0, 1 - (v.sold || 0)),
        disponible: !(v.sold),
        sold: v.sold || 0,
        imagen: v.imagen || "",
      })));
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <PageHeader breadcrumb="Vehículos" title="Vehículos" subtitle={`${lista.length} modelos disponibles`} actionLabel="Nuevo Vehículo" onAction={() => setShowModal(true)} />
      <div className="row g-3">
        {lista.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4 col-xl-3">
            <VehiculoCard vehiculo={v} />
          </div>
        ))}
      </div>
      <CrearVehiculoModal show={showModal} onClose={() => setShowModal(false)} onSaved={load} />
    </div>
  );
}
