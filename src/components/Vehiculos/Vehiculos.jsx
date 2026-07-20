import React, { useState, useEffect } from "react";
import PageHeader from "../common/PageHeader";
import VehiculoCard from "./VehiculoCard";
import CrearVehiculoModal from "./CrearVehiculoModal";
import DetalleVehiculoModal from "./DetalleVehiculoModal";
import { api } from "../../services/api";

export default function Vehiculos() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [detailVehicle, setDetailVehicle] = useState(null);

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
      setError("");
    }).catch(e => {
      setError(e.message);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este vehículo?")) return;
    try {
      await api.deleteVehicle(id);
      setLista(prev => prev.filter(v => v.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEdit = (vehiculo) => {
    setEditingVehicle(vehiculo);
    setShowModal(true);
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <PageHeader breadcrumb="Vehículos" title="Vehículos" subtitle={`${lista.length} modelos disponibles`} actionLabel="Nuevo Vehículo" onAction={() => { setEditingVehicle(null); setShowModal(true); }} />
      {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
      <div className="row g-3">
        {lista.map((v) => (
          <div key={v.id} className="col-md-6 col-lg-4 col-xl-3">
            <VehiculoCard vehiculo={v} onDetail={setDetailVehicle} />
          </div>
        ))}
      </div>
      <CrearVehiculoModal show={showModal} initialData={editingVehicle}
        onClose={() => { setShowModal(false); setEditingVehicle(null); }} onSaved={load} />
      <DetalleVehiculoModal show={!!detailVehicle} vehiculo={detailVehicle}
        onClose={() => setDetailVehicle(null)}
        onEdit={handleEdit}
        onDelete={handleDelete} />
    </div>
  );
}
