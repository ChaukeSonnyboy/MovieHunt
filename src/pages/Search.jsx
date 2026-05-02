import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

const Search = ({ apiPath }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const myQuery = searchParams.get("q") || "";
	const page = Math.max(1, Number(searchParams.get("page")) || 1);

	useTitle(myQuery ? `Results for ${myQuery}` : "Search");

	const { fetchedData: moviesList, loading, error, totalPages, totalResults } = useFetch(
		apiPath,
		myQuery,
		page
	);

	const { results: genreList } = useTmdb("genre/movie/list", {});
	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	const sortedPage = useMemo(
		() =>
			[...moviesList].sort(
				(a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
			),
		[moviesList]
	);

	const setPage = (nextPage) => {
		const next = new URLSearchParams(searchParams);
		next.set("page", String(nextPage));
		setSearchParams(next);
	};

	const summary = !myQuery
		? "Enter a search term in the header to find movies."
		: loading && sortedPage.length === 0
			? `Searching for "${myQuery}"…`
			: sortedPage.length === 0
				? `No results found for "${myQuery}"`
				: totalResults <= 20
					? `${totalResults} result${totalResults === 1 ? "" : "s"} for "${myQuery}"`
					: `Showing page ${page} of ${totalResults.toLocaleString()} results for "${myQuery}"`;

	return (
		<section className="pb-10">
			<div className="max-w-7xl mx-auto px-4 pt-6">
				<p className="text-xl font-semibold text-slate-900">{summary}</p>
				{error ? (
					<p className="mt-4 text-red-600" role="alert">
						{error}
					</p>
				) : null}
				{myQuery ? (
					<p className="mt-2 text-sm text-slate-600">
						Results sorted by release date (newest first) within this page.{" "}
						<Link to="/browse" className="text-sky-600 font-medium hover:underline">
							Explore with filters
						</Link>
					</p>
				) : null}
			</div>

			<div className={LIST_GRID}>
				{sortedPage.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						genreMap={genreMap}
						imageSize="w342"
					/>
				))}
			</div>

			{myQuery && totalPages > 1 ? (
				<nav
					className="flex flex-wrap justify-center items-center gap-2 mt-8 px-4"
					aria-label="Search pagination"
				>
					<button
						type="button"
						disabled={page <= 1 || loading}
						onClick={() => setPage(page - 1)}
						className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40"
					>
						Previous
					</button>
					<span className="text-sm text-slate-600">
						Page {page} of {totalPages}
					</span>
					<button
						type="button"
						disabled={page >= totalPages || loading}
						onClick={() => setPage(page + 1)}
						className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40"
					>
						Next
					</button>
				</nav>
			) : null}
		</section>
	);
};

Search.propTypes = {
	apiPath: PropTypes.string.isRequired,
};

export default Search;
