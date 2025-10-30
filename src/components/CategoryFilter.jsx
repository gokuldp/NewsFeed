import React from "react";

const categories = ["general", "technology", "business", "sports", "health", "entertainment", "science"];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1 rounded-md whitespace-nowrap border ${
            value === c ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800"
          }`}
        >
          {c[0].toUpperCase() + c.slice(1)}
        </button>
      ))}
    </div>
  );
}
