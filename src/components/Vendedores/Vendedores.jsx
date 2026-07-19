import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import VendedorCard from "./VendedorCard";
import { api } from "../../services/api";

export default function Vendedores() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCatalogs().then(res => {
      setLista((res.sellers || []).map(s => ({
        id: s.id,
        nombre: s.name,
        email: s.email,
        rol: "Asesor Comercial",
        rating: 4.0,
        ventas: 0,
        prospectos: 0,
        conversion: 0,
        meta: 0,
        avanceMeta: 0,
      })));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <PageHeader breadcrumb="Vendedores" title="Vendedores" subtitle={`${lista.length} asesores comerciales`} />
      <div className="row g-3">
        {lista.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4">
            <VendedorCard vendedor={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
