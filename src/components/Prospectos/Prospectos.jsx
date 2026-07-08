import React, { useState, useMemo } from "react";
import PageHeader from "../common/PageHeader";
import ProspectoRow from "./ProspectoRow";
import ProspectoModal from "./ProspectoModal";
import { prospectos as initialProspectos } from "../../data/mockData";

const filtros = ["Todos", "Prospección", "Calificación", "Negociación", "Cierre"];

export default function Prospectos() {
  const [lista, setLista] = useState(initialProspectos);
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const handleSave = (form) => {
    const nuevo = {
      id: lista.length ? Math.max(...lista.map((p) => p.id)) + 1 : 1,
      nombre: `${form.nombre} ${form.apellido}`.trim(),
      telefono: form.telefono,
      email: form.email,
      vehiculo: form.vehiculoInteres,
      etapa: form.etapa,
      vendedor: form.vendedor,
      ultimoContacto: new Date().toISOString().slice(0, 10),
    };
    setLista((prev) => [nuevo, ...prev]);
    setShowModal(false);
  };

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
                <ProspectoRow key={p.id} prospecto={p} onDelete={handleDelete} />
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

      <ProspectoModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
    </div>
  );
}
