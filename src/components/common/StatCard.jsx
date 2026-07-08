import React from "react";

export default function StatCard({ icon, iconBg, iconColor, label, value, delta, deltaPositive = true }) {
  return (
    <div className="card-soft p-3 h-100">
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="stat-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
          <i className={`bi ${icon}`} />
        </div>
        <span className={"small fw-semibold " + (deltaPositive ? "text-success" : "text-danger")}>
          {delta}
        </span>
      </div>
      <div className="fs-4 fw-bold">{value}</div>
      <div className="text-muted-sm">{label}</div>
    </div>
  );
}
