import React from "react";

const etapaClass = {
  "Prospección": "badge-prospeccion",
  "Calificación": "badge-calificacion",
  "Negociación": "badge-negociacion",
  "Cierre": "badge-cierre",
};

export default function EtapaBadge({ etapa }) {
  return (
    <span className={`badge-etapa ${etapaClass[etapa] || "badge-prospeccion"}`}>
      {etapa}
    </span>
  );
}
