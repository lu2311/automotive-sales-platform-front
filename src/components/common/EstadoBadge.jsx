import React from "react";

const estadoClass = {
  "Venta realizada": "badge-estado-realizada",
  "En negociación": "badge-estado-negociacion",
  "Venta fallida": "badge-estado-fallida",
};

export default function EstadoBadge({ estado }) {
  return (
    <span className={`badge-etapa ${estadoClass[estado] || "badge-estado-negociacion"}`}>
      {estado}
    </span>
  );
}
