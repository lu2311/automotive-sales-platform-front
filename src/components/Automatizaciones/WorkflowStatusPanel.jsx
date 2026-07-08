import React from "react";
import { workflowEstado } from "../../data/mockData";

const iconByTipo = {
  success: "bi-check-circle-fill text-success",
  info: "bi-info-circle-fill text-primary",
  danger: "bi-exclamation-triangle-fill text-danger",
};

export default function WorkflowStatusPanel() {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="card-soft p-3">
        <div className="fw-semibold mb-3">Estado del Workflow</div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted-sm">Estado</span>
          <span className="badge-etapa badge-cierre">{workflowEstado.estado}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted-sm">Última ejecución</span>
          <span className="small fw-medium">{workflowEstado.ultimaEjecucion}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted-sm">Tiempo promedio</span>
          <span className="small fw-medium">{workflowEstado.tiempoPromedio}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted-sm">Ejecuciones totales</span>
          <span className="small fw-medium">{workflowEstado.ejecucionesTotales.toLocaleString()}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-muted-sm">Errores</span>
          <span className="small fw-medium text-danger">{workflowEstado.errores}</span>
        </div>
      </div>

      <div className="card-soft p-3">
        <div className="fw-semibold mb-3">Log de Actividad</div>
        <div className="d-flex flex-column gap-3">
          {workflowEstado.log.map((item, idx) => (
            <div key={idx} className="d-flex gap-2">
              <i className={`bi ${iconByTipo[item.tipo]}`} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontSize: "0.82rem" }}>{item.texto}</div>
                <div className="text-muted-sm">{item.hace}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
