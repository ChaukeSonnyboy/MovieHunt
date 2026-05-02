import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";
import PropTypes from "prop-types";
import { todayISO, tomorrowISO } from "../lib/dates";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

const Movies = ({ title, discoverKind }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Math.max(1, Number(searchParams.get("page")) || 1);
	const genre = searchParams.get("genre") || "";
	const year = searchParams.get("year") || "";

	useTitle(title);

	const { results: genreList } = useTmdb("genre/movie/list", {});

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	const discoverParams = useMemo(() => {
		const p = {
			page,
			include_adult: false,
			include_video: false,
		};
		if (genre) p.with_genres = genre;
		if (year) p.primary_release_year = Number(year);

		if (discoverKind === "upcoming") {
			p["primary_release_date.gte"] = tomorrowISO();
			p.sort_by = "primary_release_date.asc";
		} else {
			p["primary_release_date.lte"] = todayISO();
			if (discoverKind === "popular") {
				p.sort_by = "popularity.desc";
			} else {
				p.sort_by = "vote_average.desc";
				p["vote_count.gte"] = 200;
			}
		}
		return p;
	}, [page, genre, year, discoverKind]);

	const {
		results: rawList,
		loading,
		error,
		totalPages,
		totalResults,
	} = useTmdb("discover/movie", discoverParams);

	const tToday = todayISO();
	const tTomorrow = tomorrowISO();

	const moviesList = useMemo(() => {
		if (discoverKind === "upcoming") {
			return rawList.filter((m) => m.release_date && m.release_date >= tTomorrow);
		}
		return rawList.filter((m) => !m.release_date || m.release_date <= tToday);
	}, [rawList, discoverKind, tToday, tTomorrow]);

	const sortedMoviesList = [...moviesList].sort((a, b) => {
		if (discoverKind === "upcoming") {
			return (
				new Date(a.release_date || 0) - new Date(b.release_date || 0)
			);
		}
		return new Date(b.release_date || 0) - new Date(a.release_date || 0);
	});

	const yearOptions = useMemo(() => {
		const cy = new Date().getFullYear();
		const arr = [];
		if (discoverKind === "upcoming") {
			for (let y = cy + 8; y >= cy; y--) arr.push(y);
		} else {
			for (let y = cy; y >= 1950; y--) arr.push(y);
		}
		return arr;
	}, [discoverKind]);

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
				<h1 className="text-3xl font-bold text-slate-900">{title}</h1>
				<p className="mt-2 text-sm text-slate-600 max-w-2xl">
					{discoverKind === "upcoming"
						? "Showing titles releasing from tomorrow onward. Filter by genre or year."
						: "Released titles only. Filter by genre and/or year."}
				</p>

				<div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:items-end">
					<label className="flex flex-col gap-1 text-sm font-medium text-slate-700 min-w-[140px]">
						Genre
						<select
							value={genre}
							onChange={(e) => setParam("genre", e.target.value)}
							className="rounded-lg border border-slate-300 px-3 py-2 bg-white"
						>
							<option value="">All genres</option>
							{genreList.map((g) => (
								<option key={g.id} value={String(g.id)}>
									{g.name}
								</option>
							))}
						</select>
					</label>
					<label className="flex flex-col gap-1 text-sm font-medium text-slate-700 min-w-[120px]">
						Year
						<select
							value={year}
							onChange={(e) => setParam("year", e.target.value)}
							className="rounded-lg border border-slate-300 px-3 py-2 bg-white"
						>
							<option value="">Any year</option>
							{yearOptions.map((y) => (
								<option key={y} value={String(y)}>
									{y}
								</option>
							))}
						</select>
					</label>
					<button
						type="button"
						onClick={() => setSearchParams(new URLSearchParams())}
						className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 self-start sm:self-end"
					>
						Clear filters
					</button>
				</div>

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

Movies.propTypes = {
	title: PropTypes.string.isRequired,
	discoverKind: PropTypes.oneOf(["popular", "top", "upcoming"]).isRequired,
};

export default Movies;
