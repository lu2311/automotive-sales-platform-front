import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import VehiculoCard from "./VehiculoCard";
import { api } from "../../services/api";

export default function Vehiculos() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCatalogs().then(res => {
      setLista((res.vehicles || []).map(v => ({
        id: v.id,
        nombre: `${v.brand} ${v.model} ${v.year}`,
        marca: v.brand,
        precio: v.price,
        stock: 0,
        disponible: true,
        imagen: "",
      })));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <PageHeader breadcrumb="Vehículos" title="Vehículos" subtitle={`${lista.length} modelos disponibles`} />
      <div className="row g-3">
        {lista.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4 col-xl-3">
            <VehiculoCard vehiculo={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
