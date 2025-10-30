import React from "react";

export default function NewsCard({ article }) {
  const { title, urlToImage, description, url, source, publishedAt } = article;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="h-44 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {urlToImage ? (
          <img src={urlToImage} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="p-4 text-sm text-gray-500">No image</div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">{description || "No description available."}</p>
        <div className="text-xs text-gray-500 flex justify-between">
          <span>{source?.name || "Unknown"}</span>
          <span>{new Date(publishedAt).toLocaleString()}</span>
        </div>
      </div>
    </a>
  );
}
