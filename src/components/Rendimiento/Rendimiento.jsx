import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import { rendimiento as initialData } from "../../data/mockData";

export default function Rendimiento() {
  const [data, setData] = useState(initialData);

  const ultimo = data[0] || {};

  const criterioClass = ultimo.acceptance ? "text-success" : "text-danger";
  const criterioLabel = ultimo.acceptance ? "Cumple" : "No cumple";

  return (
    <div>
      <PageHeader
        breadcrumb="Pruebas de Software"
        title="Rendimiento"
        subtitle="Resultados de simulaciones de carga concurrente"
      />

      <div className="card-soft p-3 mb-3">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h6 className="fw-bold mb-1">Objetivo: respuesta menor a 2 segundos (p95 es menor a 2000 ms)</h6>
            <p className="text-muted-sm mb-0">
              Ejecuta los escenarios desde Terminal con <code>npm run load50</code> o <code>npm run load100</code>;
              los resultados aparecen aquí automáticamente.
            </p>
          </div>
          <div className="col-md-4 text-md-end mt-2 mt-md-0">
            <span className="badge bg-light text-dark fs-6 px-3 py-2">50 / 100 ventas simultáneas</span>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="card-soft p-3 h-100">
            <div className="tag text-muted-sm">Último p95</div>
            <div className="fs-3 fw-bold">{ultimo.p95_ms ? `${ultimo.p95_ms} ms` : "—"}</div>
            <div className="text-muted-sm">Percentil 95</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-soft p-3 h-100">
            <div className="tag text-muted-sm">Tasa de error</div>
            <div className="fs-3 fw-bold">{ultimo.error_rate != null ? `${ultimo.error_rate}%` : "—"}</div>
            <div className="text-muted-sm">Objetivo 0%</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-soft p-3 h-100">
            <div className="tag text-muted-sm">Criterio</div>
            <div className={`fs-3 fw-bold ${criterioClass}`}>{criterioLabel}</div>
            <div className="text-muted-sm">p95 es menor a 2000 ms</div>
          </div>
        </div>
      </div>

      <div className="card-soft p-3">
        <div className="table-responsive">
          <table className="table table-clean mb-0">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concurrencia</th>
                <th>Éxitos</th>
                <th>Promedio</th>
                <th>p95</th>
                <th>Máximo</th>
                <th>Error</th>
                <th>Criterio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td className="text-muted-sm">{r.date}</td>
                  <td><b>{r.concurrency}</b></td>
                  <td>{r.success}/{r.requests}</td>
                  <td>{r.avg_ms} ms</td>
                  <td><b>{r.p95_ms} ms</b></td>
                  <td>{r.max_ms} ms</td>
                  <td>{r.error_rate}%</td>
                  <td>
                    <span className={r.acceptance ? "text-success fw-semibold" : "text-danger fw-semibold"}>
                      {r.acceptance ? "Cumple" : "No cumple"}
                    </span>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    Ejecuta las pruebas de carga para registrar resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}