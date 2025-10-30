import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={submit} className="flex w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search news (e.g., bitcoin, tesla, space)..."
        className="flex-1 px-4 py-2 rounded-l-md border border-r-0 focus:outline-none"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}
