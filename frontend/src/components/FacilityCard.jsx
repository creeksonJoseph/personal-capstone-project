import React from "react";

function FacilityCard({ icon, title, description, isHighlighted = false }) {
  return (
    <div
      className={`p-6 border hover:shadow-lg transition-shadow ${isHighlighted ? "bg-sky-blue/30 border-2 border-sky-blue/50" : "bg-off-white border border-primary/10"}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary text-2xl">
          {icon}
        </span>
        <h3 className="font-bold text-primary">{title}</h3>
      </div>
      <p
        className={`text-sm ${isHighlighted ? "font-bold" : "text-charcoal/70"}`}
      >
        {description}
      </p>
    </div>
  );
}

export default FacilityCard;
