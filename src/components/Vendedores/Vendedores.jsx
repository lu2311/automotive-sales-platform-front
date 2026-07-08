import React from "react";
import PageHeader from "../common/PageHeader";
import VendedorCard from "./VendedorCard";
import { vendedores } from "../../data/mockData";

export default function Vendedores() {
  return (
    <div>
      <PageHeader
        breadcrumb="Vendedores"
        title="Vendedores"
        subtitle={`${vendedores.length} asesores activos`}
        actionLabel="Agregar Asesor"
      />

      <div className="row g-3">
        {vendedores.map((v) => (
          <div key={v.id} className="col-md-6 col-xl-4">
            <VendedorCard vendedor={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
