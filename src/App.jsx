import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import NewsList from "./components/NewsList";

const PAGE_SIZE = 1;

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("general");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SearchBar onSearch={(q) => setQuery(q)} />
            <CategoryFilter value={category} onChange={setCategory} />
          </div>

          <NewsList query={query} category={category} pageSize={PAGE_SIZE} />
        </div>
      </main>
      
      <footer className="text-center py-9 px-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p>📰 Built by <span className="font-semibold text-blue-500 dark:text-blue-400">Gokul D</span> — News Feed</p>
      </footer>
    </div>
  );
}
