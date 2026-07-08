import React from "react";
import PageHeader from "../common/PageHeader";
import WorkflowStep from "./WorkflowStep";
import WorkflowStatusPanel from "./WorkflowStatusPanel";
import { workflowSteps } from "../../data/mockData";

export default function Automatizaciones() {
  return (
    <div>
      <PageHeader
        breadcrumb="Automatizaciones"
        title="Automatizaciones"
        subtitle="Workflow activo"
        actionLabel="Nuevo Workflow"
      />

      <div className="row g-4">
        <div className="col-lg-8">
          {workflowSteps.map((step, idx) => (
            <WorkflowStep
              key={step.id}
              step={step}
              index={idx + 1}
              isLast={idx === workflowSteps.length - 1}
              highlighted={idx === workflowSteps.length - 1}
            />
          ))}
        </div>
        <div className="col-lg-4">
          <WorkflowStatusPanel />
        </div>
      </div>
    </div>
  );
}
