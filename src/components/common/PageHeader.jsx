import React from "react";

export default function PageHeader({ breadcrumb, title, subtitle, actionLabel, actionIcon = "bi-plus-lg", onAction }) {
  return (
    <div className="d-flex align-items-start justify-content-between mb-4 flex-wrap gap-2">
      <div>
        {breadcrumb && (
          <div className="text-muted-sm mb-1">
            <i className="bi bi-house-door me-1" /> {breadcrumb}
          </div>
        )}
        <h4 className="fw-bold mb-0">{title}</h4>
        {subtitle && <div className="text-muted-sm">{subtitle}</div>}
      </div>
      {actionLabel && (
        <button className="btn btn-primary-brand text-white d-flex align-items-center gap-2" onClick={onAction}>
          <i className={`bi ${actionIcon}`} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
