import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "./NewsCard";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY||d236744b7319477280748cbc6356cfb7;
const BASE = "https://newsapi.org/v2";

export default function NewsList({ query, category, pageSize = 1 }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();


  useEffect(() => {
    setArticles([]);
    setPage(1);
    setTotalResults(null);
  }, [query, category]);

  const fetchArticles = useCallback(async (pageToFetch = 1) => {
    setLoading(true);
    setError(null);
    try {
      
      const params = new URLSearchParams();
      params.append("apiKey", API_KEY);
      params.append("page", pageToFetch);
      params.append("pageSize", pageSize);

      let url;
      if (query) {
        params.append("q", query);
        url = `${BASE}/everything?${params.toString()}`;
      } else {
  
        params.append("category", category);
        params.append("country", "us");
        url = `${BASE}/top-headlines?${params.toString()}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.status !== "ok") throw new Error(data.message || "API error");

      setArticles((prev) => (pageToFetch === 1 ? data.articles : [...prev, ...data.articles]));
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, pageSize, query, category]);


  useEffect(() => {
    fetchArticles(page);
 
  }, [fetchArticles, page]);

  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
   
        if (totalResults == null || articles.length < totalResults) {
          setPage((p) => p + 1);
        }
      }
    }, { rootMargin: "200px" });
    if (node) observerRef.current.observe(node);
  }, [loading, totalResults, articles.length]);

  if (error) return <ErrorCard message={error} />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((a, idx) => {

          if (idx === articles.length - 1) {
            return (
              <div key={a.url || idx} ref={lastElementRef}>
                <NewsCard article={a} />
              </div>
            );
          }
          return (
            <div key={a.url || idx}>
              <NewsCard article={a} />
            </div>
          );
        })}
      </div>

      {loading && <Loading />}


      {!loading && totalResults != null && articles.length < totalResults && (
        <div className="mt-6 text-center">
          <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 border rounded">
            Load more
          </button>
        </div>
      )}

     
      {!loading && articles.length === 0 && (
        <div className="py-12 text-center text-gray-600 dark:text-gray-300">You have reached the free API limit (100 results)</div>
      )}

      
    </>
  );
}
