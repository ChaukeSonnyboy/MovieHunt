import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

const NowPlaying = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Math.max(1, Number(searchParams.get("page")) || 1);

	useTitle("Now playing");

	const { results: rawList, loading, error, totalPages, totalResults } = useTmdb(
		"movie/now_playing",
		{ page }
	);

	const { results: genreList } = useTmdb("genre/movie/list", {});

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	const sortedMoviesList = useMemo(
		() =>
			[...rawList].sort(
				(a, b) =>
					new Date(b.release_date || 0) - new Date(a.release_date || 0)
			),
		[rawList]
	);

	const setParam = (key, value) => {
		const next = new URLSearchParams(searchParams);
		if (value === "" || value === undefined || value === null) {
			next.delete(key);
		} else {
			next.set(key, String(value));
		}
		if (key !== "page") next.delete("page");
		setSearchParams(next);
	};

	return (
		<section className="pb-10">
			<div className="max-w-7xl mx-auto px-4 pt-6">
				<h1 className="text-3xl font-bold text-slate-900">Now playing</h1>
				<p className="mt-2 text-sm text-slate-600 max-w-2xl">
					Titles TMDB reports as in theaters in your region. Lists and dates may vary by
					market.
				</p>

				{error ? (
					<p className="mt-4 text-red-600" role="alert">
						{error}
					</p>
				) : null}
				<p className="mt-3 text-slate-600 text-sm">
					{loading ? "Loading…" : `${totalResults.toLocaleString()} matches`}
				</p>
			</div>

			{loading && sortedMoviesList.length === 0 ? (
				<p className="text-center py-12 text-slate-500">Loading movies…</p>
			) : null}

			<div className={LIST_GRID}>
				{sortedMoviesList.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						genreMap={genreMap}
						imageSize="w342"
					/>
				))}
			</div>

			{totalPages > 1 ? (
				<nav
					className="flex flex-wrap justify-center items-center gap-2 mt-8 px-4"
					aria-label="Pagination"
				>
					<button
						type="button"
						disabled={page <= 1 || loading}
						onClick={() => setParam("page", String(page - 1))}
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
						onClick={() => setParam("page", String(page + 1))}
						className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40"
					>
						Next
					</button>
				</nav>
			) : null}
		</section>
	);
};

export default NowPlaying;
