import React, { useState, useEffect, useMemo } from "react";
import PageHeader from "../common/PageHeader";
import ProspectoRow from "./ProspectoRow";
import ProspectoModal from "./ProspectoModal";
import CierreModal from "./CierreModal";
import SeguroModal from "../Seguros/SeguroModal";
import { api } from "../../services/api";

const filtros = ["Todos", "Prospección", "Calificación", "Negociación", "Cierre"];
const stageFromAPI = { initial: "Prospección", qualification: "Calificación", negotiation: "Negociación", closed: "Cierre" };
const stageToAPI = { Prospección: "initial", Calificación: "qualification", Negociación: "negotiation", Cierre: "closed" };

export default function Prospectos() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProspect, setEditingProspect] = useState(null);
  const [showCierreModal, setShowCierreModal] = useState(false);
  const [closingProspect, setClosingProspect] = useState(null);
  const [showSeguroModal, setShowSeguroModal] = useState(false);
  const [lastSaleId, setLastSaleId] = useState(null);
  const [isCierreSaving, setIsCierreSaving] = useState(false);
  const [isSeguroSaving, setIsSeguroSaving] = useState(false);

  const load = async () => {
    try {
      const data = await api.getProspects();
      setLista(data.map(p => ({
        id: p.id,
        nombre: p.name,
        telefono: p.phone,
        email: p.email,
        vehiculo: p.vehicle_name || "",
        vehicle_id: p.vehicle_id,
        etapa: stageFromAPI[p.stage] || p.stage,
        vendedor: p.seller_name,
        vendedorId: p.seller_id,
        ultimoContacto: p.last_activity ? p.last_activity.slice(0, 10) : "",
      })));
    } catch (e) {
      console.error('Error loading prospects:', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);



  const filtrados = useMemo(() => {
    return lista.filter((p) => {
      const coincideFiltro = filtro === "Todos" || p.etapa === filtro;
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.vehiculo.toLowerCase().includes(busqueda.toLowerCase());
      return coincideFiltro && coincideBusqueda;
    });
  }, [lista, filtro, busqueda]);

  const handleDelete = (id) => {
    setLista((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = async (form) => {
    const sellerId = Number(form.vendedorId);
    if (!sellerId || sellerId <= 0) {
      alert("Seleccione un vendedor asignado");
      return;
    }
    const payload = {
      name: `${form.nombre} ${form.apellido}`.trim(),
      email: form.email,
      phone: form.telefono,
      vehicle_id: form.vehicle_id ? Number(form.vehicle_id) : undefined,
      seller_id: sellerId,
      stage: stageToAPI[form.etapa] || "initial",
    };
    try {
      if (editingProspect) {
        await api.updateProspect(editingProspect.id, payload);
      } else {
        await api.createProspect(payload);
      }
      await load();
    } catch (e) {
      alert(e.message);
    }
    setShowModal(false);
    setEditingProspect(null);
  };


  const handleEdit = (prospecto) => {
    setEditingProspect(prospecto);
    setShowModal(true);
  };

  const nextStage = { "Prospección": "Calificación", "Calificación": "Negociación", "Negociación": "Cierre" };

  const handleAdvance = async (prospecto) => {
    const nuevaEtapa = nextStage[prospecto.etapa];
    if (!nuevaEtapa) return;

    if (nuevaEtapa === "Cierre") {
      setClosingProspect(prospecto);
      setShowCierreModal(true);
      return;
    }

    try {
      await api.updateProspect(prospecto.id, { stage: stageToAPI[nuevaEtapa] });
      await load();
    } catch (e) {
      alert(e.message);
    }
  };

  const mapError = (msg) => {
    if (!msg) return "Ocurrió un error inesperado";
    if (msg.includes("ya está cerrado") || msg.includes("ya tiene una venta"))
      return "Este prospecto ya fue cerrado. Recargue la página.";
    if (msg.includes("motivo de pérdida"))
      return "Debe indicar el motivo de pérdida para registrar una venta fallida.";
    if (msg.includes("monto debe ser mayor"))
      return "El monto de la venta debe ser mayor a cero.";
    if (msg.includes("Vehículo no encontrado"))
      return "El vehículo seleccionado no existe. Recargue el catálogo.";
    if (msg.includes("Vendedor no encontrado"))
      return "El vendedor asignado no existe. Recargue la página.";
    return msg;
  };

  const handleCierreSave = async (form) => {
    setIsCierreSaving(true);
    try {
      const sale = await api.createSale({
        prospect_id: closingProspect.id,
        vehicle_id: Number(form.vehicleId),
        seller_id: closingProspect.vendedorId,
        amount: Number(form.monto),
        status: form.resultado === "won" ? "completed" : "failed",
        loss_reason: form.loss_reason || undefined,
      });
      setShowCierreModal(false);
      setClosingProspect(null);
      if (form.resultado === "won" && sale?.id) {
        setLastSaleId(sale.id);
        setShowSeguroModal(true);
      }
      await load();
    } catch (e) {
      alert(mapError(e.message));
    } finally {
      setIsCierreSaving(false);
    }
  };


  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;


  return (
    <div>
      <PageHeader
        breadcrumb="Prospectos"
        title="Prospectos"
        subtitle={`${lista.length} prospectos activos`}
        actionLabel="Nuevo Prospecto"
        onAction={() => setShowModal(true)}
      />

      <div className="card-soft p-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="position-relative" style={{ width: 280 }}>
            <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted" />
            <input
              className="form-control ps-5"
              placeholder="Buscar nombre o vehículo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {filtros.map((f) => (
              <button
                key={f}
                className={`btn btn-sm ${filtro === f ? "btn-primary-brand text-white" : "btn-outline-secondary"}`}
                onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
            <i className="bi bi-download" /> Exportar
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-clean mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Vehículo</th>
                <th>Etapa</th>
                <th>Vendedor</th>
                <th>Último Contacto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <ProspectoRow
                  key={p.id}
                  prospecto={p}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onAdvance={handleAdvance}
                />
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No se encontraron prospectos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CierreModal
        show={showCierreModal}
        prospecto={closingProspect}
        isSaving={isCierreSaving}
        onClose={() => { setShowCierreModal(false); setClosingProspect(null); }}
        onSave={handleCierreSave}
      />

      <SeguroModal
        show={showSeguroModal}
        prefilledSaleId={lastSaleId}
        isSaving={isSeguroSaving}
        onClose={() => setShowSeguroModal(false)}
        onSave={async (form) => {
          setIsSeguroSaving(true);
          try {
            await api.createInsurance({
              sale_id: lastSaleId,
              type: form.tipo,
              expected_premium: Number(form.primaEsperada),
              actual_premium: form.primaReal ? Number(form.primaReal) : null,
              status: form.estado === "Vendido" ? "sold" : "prospected",
            });
            setShowSeguroModal(false);
            await load();
          } catch (e) {
            alert(mapError(e.message));
          } finally {
            setIsSeguroSaving(false);
          }
        }}
      />

      <ProspectoModal
        show={showModal}
        initialData={editingProspect}
        onClose={() => { setShowModal(false); setEditingProspect(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
