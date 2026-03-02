import React from "react";

function CurriculumCard({ icon, title, ageRange, description, features }) {
  return (
    <div className="flex flex-col p-10 bg-sky-blue/30 border border-sky-blue/50 hover:shadow-xl transition-shadow group">
      <div className="bg-white size-16 flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <h3 className="text-primary text-2xl font-bold mb-4 font-display">
        {title}
        <span className="block text-lg font-display font-medium text-charcoal/60 mt-1">
          {ageRange}
        </span>
      </h3>
      <p className="text-charcoal text-base font-serif-body leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-primary text-lg">
              check_circle
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurriculumCard;
