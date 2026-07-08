import React from "react";

export default function WorkflowStep({ step, index, isLast, highlighted }) {
  return (
    <div className="d-flex gap-3">
      <div className="d-flex flex-column align-items-center">
        <div
          className={`d-flex align-items-center justify-content-center rounded-circle bg-${step.color}-subtle`}
          style={{ width: 40, height: 40 }}
        >
          <i className={`bi ${step.icono} text-${step.color}`} />
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, backgroundColor: "#eaedf3", minHeight: 30 }} />}
      </div>
      <div className={`card-soft p-3 mb-3 flex-grow-1 ${highlighted ? "border-danger" : ""}`}>
        <div className="text-muted-sm">Paso {index}</div>
        <div className="fw-semibold">{step.titulo}</div>
        <div className="text-muted-sm">{step.descripcion}</div>
      </div>
    </div>
  );
}
