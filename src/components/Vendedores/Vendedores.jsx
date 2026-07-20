import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import VendedorCard from "./VendedorCard";
import CrearVendedorModal from "./CrearVendedorModal";
import { api } from "../../services/api";

export default function Vendedores() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.getCatalogs(),
      api.getConversion(),
    ]).then(([catalog, conv]) => {
      const convMap = {};
      (conv || []).forEach(c => { convMap[c.seller_id] = c; });
      setLista((catalog.sellers || []).map(s => {
        const c = convMap[s.id] || {};
        const prospects = c.prospects || 0;
        const won = c.won || 0;
        const rate = prospects > 0 ? c.rate : 0;
        return {
          id: s.id,
          nombre: s.name,
          email: s.email,
          rol: "Asesor Comercial",
          rating: rate > 50 ? 4.5 : rate > 20 ? 3.5 : 3.0,
          ventas: won,
          prospectos: prospects,
          conversion: rate,
          meta: 0,
          avanceMeta: 0,
        };
      }));
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <PageHeader breadcrumb="Vendedores" title="Vendedores" subtitle={`${lista.length} asesores comerciales`} actionLabel="Nuevo Vendedor" onAction={() => setShowModal(true)} />
      <div className="row g-3">
        {lista.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4">
            <VendedorCard vendedor={v} />
          </div>
        ))}
      </div>
      <CrearVendedorModal show={showModal} onClose={() => setShowModal(false)} onSaved={load} />
    </div>
  );
}
