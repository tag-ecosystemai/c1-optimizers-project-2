const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function fetchArticle(url) {
  return request("/fetch", {
    method: "POST",
    body: JSON.stringify({ url }),
  });
}

export function analyzeArticle(text) {
  return request("/analyze", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export function summarizeArticle(text) {
  return request("/summarize", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export function compareTopic(topic, maxArticles = 2) {
  const params = new URLSearchParams({ topic, max_articles: maxArticles });
  return request(`/compare?${params.toString()}`, {
    method: "GET",
  });
}