import React from "react";
export default function ErrorCard({ message }) {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/30 border border-red-200 rounded text-red-700 dark:text-red-300">
      <strong>Something went wrong</strong>
      <div className="mt-2 text-sm">{message}</div>
    </div>
  );
}
