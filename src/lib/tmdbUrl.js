/**
 * Build a TMDB v3 API URL with api_key and optional query params.
 * @param {string} apiPath - e.g. "discover/movie" or "search/movie"
 * @param {Record<string, string | number | undefined | null>} params
 */
export function buildTmdbUrl(apiPath, params = {}) {
	const key = import.meta.env.VITE_API_KEY;
	if (!key) return "";
	const path = String(apiPath).replace(/^\//, "");
	const url = new URL(`https://api.themoviedb.org/3/${path}`);
	url.searchParams.set("api_key", key);
	for (const [k, v] of Object.entries(params)) {
		if (v === undefined || v === null || v === "") continue;
		url.searchParams.set(k, String(v));
	}
	return url.toString();
}
