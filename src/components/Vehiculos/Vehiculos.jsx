import React from "react";
import PageHeader from "../common/PageHeader";
import VehiculoCard from "./VehiculoCard";
import { vehiculos } from "../../data/mockData";

export default function Vehiculos() {
  return (
    <div>
      <PageHeader
        breadcrumb="Vehículos"
        title="Vehículos"
        subtitle={`${vehiculos.length} modelos en catálogo`}
        actionLabel="Agregar Vehículo"
      />

      <div className="row g-3">
        {vehiculos.map((v) => (
          <div key={v.id} className="col-6 col-md-4 col-xl-3">
            <VehiculoCard vehiculo={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
