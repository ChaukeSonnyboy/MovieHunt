import { useState, useEffect, useMemo } from "react";
import { buildTmdbUrl } from "../lib/tmdbUrl";

/**
 * Fetch TMDB JSON; maps `results` or `genres` to `results` for convenience.
 * @param {string} apiPath
 * @param {Record<string, string | number | undefined | null>} params
 * @param {{ enabled?: boolean }} options
 */
export function useTmdb(apiPath, params = {}, options = {}) {
	const { enabled = true } = options;
	const [state, setState] = useState({
		results: [],
		loading: false,
		error: null,
		totalPages: 0,
		totalResults: 0,
	});

	const url = useMemo(() => {
		if (!enabled || !apiPath) return "";
		return buildTmdbUrl(apiPath, params);
	}, [apiPath, enabled, params]);

	useEffect(() => {
		if (!url) {
			setState({
				results: [],
				loading: false,
				error: null,
				totalPages: 0,
				totalResults: 0,
			});
			return;
		}

		const ac = new AbortController();
		setState((s) => ({ ...s, loading: true, error: null }));

		(async () => {
			try {
				const res = await fetch(url, { signal: ac.signal });
				const data = await res.json();
				if (ac.signal.aborted) return;
				if (!res.ok) {
					throw new Error(data.status_message || res.statusText || "Request failed");
				}
				const list = data.results ?? data.genres ?? [];
				setState({
					results: list,
					loading: false,
					error: null,
					totalPages: data.total_pages ?? 0,
					totalResults: data.total_results ?? list.length,
				});
			} catch (e) {
				if (e.name === "AbortError") return;
				setState({
					results: [],
					loading: false,
					error: e.message || "Failed to load",
					totalPages: 0,
					totalResults: 0,
				});
			}
		})();

		return () => ac.abort();
	}, [url]);

	return state;
}
