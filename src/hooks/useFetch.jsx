import { useMemo } from "react";
import { useTmdb } from "./useTmdb";

/**
 * @param {string} apiPath - TMDB path under /3/
 * @param {string} [myQuery] - for search/movie only
 * @param {number} [page] - page number (default 1)
 */
const useFetch = (apiPath, myQuery = "", page = 1) => {
	const isSearch = apiPath === "search/movie";
	const params = useMemo(() => {
		if (apiPath === "search/movie") return { query: myQuery, page };
		return { page };
	}, [apiPath, myQuery, page]);
	const enabled = !isSearch || Boolean(myQuery && String(myQuery).trim());

	const { results, loading, error, totalPages, totalResults } = useTmdb(
		apiPath,
		params,
		{ enabled }
	);

	return {
		fetchedData: results,
		loading,
		error,
		totalPages,
		totalResults,
	};
};

export default useFetch;
export { useTmdb };
