import React from "react";
import EtapaBadge from "../common/EtapaBadge";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProspectoRow({ prospecto, onDelete }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-circle" style={{ width: 32, height: 32, fontSize: "0.72rem" }}>
            {initials(prospecto.nombre)}
          </div>
          <span className="fw-medium">{prospecto.nombre}</span>
        </div>
      </td>
      <td>{prospecto.telefono}</td>
      <td className="text-truncate" style={{ maxWidth: 180 }}>{prospecto.email}</td>
      <td>{prospecto.vehiculo}</td>
      <td>
        <EtapaBadge etapa={prospecto.etapa} />
      </td>
      <td>{prospecto.vendedor}</td>
      <td>{prospecto.ultimoContacto}</td>
      <td>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-light"><i className="bi bi-eye" /></button>
          <button className="btn btn-sm btn-light"><i className="bi bi-pencil" /></button>
          <button className="btn btn-sm btn-light text-danger" onClick={() => onDelete(prospecto.id)}>
            <i className="bi bi-trash" />
          </button>
        </div>
      </td>
    </tr>
  );
}
