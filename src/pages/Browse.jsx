import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

function formatISODate(d) {
	return d.toISOString().slice(0, 10);
}

function todayISO() {
	return formatISODate(new Date());
}

function daysAgoISO(days) {
	const d = new Date();
	d.setDate(d.getDate() - days);
	return formatISODate(d);
}

const SORT_OPTIONS = [
	{ value: "primary_release_date.desc", label: "Newest release" },
	{ value: "primary_release_date.asc", label: "Oldest release" },
	{ value: "popularity.desc", label: "Popularity" },
	{ value: "vote_average.desc", label: "Highest rated" },
];

const Browse = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);

	const page = Math.max(1, Number(searchParams.get("page")) || 1);
	const yearParam = searchParams.get("year");
	const fromParam = searchParams.get("from");
	const toParam = searchParams.get("to");
	const genreParam = searchParams.get("genre");
	const sortBy = searchParams.get("sort") || "primary_release_date.desc";

	const year = yearParam ? Number(yearParam) : null;
	const from = fromParam || null;
	const to = toParam || null;
	const genre = genreParam || "";

	const discoverParams = useMemo(() => {
		const p = {
			page,
			sort_by: sortBy,
			include_adult: false,
			include_video: false,
		};

		if (from || to) {
			if (from) p["primary_release_date.gte"] = from;
			if (to) p["primary_release_date.lte"] = to;
		} else if (year) {
			p.primary_release_year = year;
		} else {
			p["primary_release_date.gte"] = daysAgoISO(90);
			p["primary_release_date.lte"] = todayISO();
		}

		if (genre) p.with_genres = genre;

		return p;
	}, [page, year, from, to, genre, sortBy]);

	const { results: movies, loading, error, totalPages, totalResults } = useTmdb(
		"discover/movie",
		discoverParams
	);

	const { results: genreList } = useTmdb("genre/movie/list", {});

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	useTitle("Browse movies");

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

	const applyFilters = (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const next = new URLSearchParams();
		const y = fd.get("year");
		const f = fd.get("from");
		const t = fd.get("to");
		const g = fd.get("genre");
		const s = fd.get("sort");
		if (y) next.set("year", y);
		if (f) next.set("from", f);
		if (t) next.set("to", t);
		if (g) next.set("genre", g);
		if (s) next.set("sort", s);
		setSearchParams(next);
		setFiltersOpen(false);
	};

	const clearFilters = () => {
		setSearchParams({});
		setFiltersOpen(false);
	};

	const hasCustomRange = Boolean(from || to);
	const hasYear = Boolean(year);

	return (
		<section className="pb-10">
			<div className="max-w-7xl mx-auto px-4 pt-6">
				<h1 className="text-3xl font-bold text-slate-900">Browse by release & genre</h1>
				<p className="mt-2 text-slate-600 max-w-2xl">
					Filter by year, release window, or genre. By default we show titles released in the{" "}
					<strong>last 90 days</strong> (new releases). Adjust filters to explore more.
				</p>

				<button
					type="button"
					className="mt-4 md:hidden rounded-lg border border-sky-500 bg-sky-50 px-4 py-2 font-medium text-sky-800"
					onClick={() => setFiltersOpen(!filtersOpen)}
				>
					{filtersOpen ? "Hide filters" : "Show filters"}
				</button>

				<div
					className={`mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
						filtersOpen ? "block" : "hidden"
					} md:block`}
				>
					<form onSubmit={applyFilters} className="flex flex-col gap-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
								Year
								<input
									name="year"
									type="number"
									min="1900"
									max="2100"
									placeholder="e.g. 2026"
									defaultValue={yearParam || ""}
									className="rounded-md border border-slate-300 px-3 py-2"
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
								From
								<input
									name="from"
									type="date"
									defaultValue={from || ""}
									className="rounded-md border border-slate-300 px-3 py-2"
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
								To
								<input
									name="to"
									type="date"
									defaultValue={to || ""}
									className="rounded-md border border-slate-300 px-3 py-2"
								/>
							</label>
							<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
								Genre
								<select
									name="genre"
									defaultValue={genre}
									className="rounded-md border border-slate-300 px-3 py-2 bg-white"
								>
									<option value="">All genres</option>
									{genreList.map((g) => (
										<option key={g.id} value={String(g.id)}>
											{g.name}
										</option>
									))}
								</select>
							</label>
						</div>
						<label className="flex flex-col gap-1 text-sm font-medium text-slate-700 max-w-md">
							Sort by
							<select
								name="sort"
								defaultValue={sortBy}
								className="rounded-md border border-slate-300 px-3 py-2 bg-white"
							>
								{SORT_OPTIONS.map((o) => (
									<option key={o.value} value={o.value}>
										{o.label}
									</option>
								))}
							</select>
						</label>
						<div className="flex flex-wrap gap-2">
							<button
								type="submit"
								className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
							>
								Apply
							</button>
							<button
								type="button"
								onClick={clearFilters}
								className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
							>
								Reset to last 90 days
							</button>
						</div>
						<p className="text-xs text-slate-500">
							{hasCustomRange
								? "Date range is active (year-only filter is ignored until you clear from/to)."
								: hasYear
									? "Calendar year filter is active."
									: "Default: titles with primary release in roughly the last 90 days."}
						</p>
					</form>
				</div>

				<div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
					<span>
						{loading ? "Loading…" : `${totalResults.toLocaleString()} results`}
					</span>
					{error ? (
						<span className="text-red-600" role="alert">
							{error}
						</span>
					) : null}
				</div>
			</div>

			{loading && movies.length === 0 ? (
				<p className="text-center py-12 text-slate-500">Loading movies…</p>
			) : null}

			{!loading && movies.length === 0 && !error ? (
				<p className="text-center py-12 text-slate-500">No movies match these filters.</p>
			) : null}

			<div className={LIST_GRID}>
				{movies.map((movie) => (
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

			<p className="text-center text-xs text-slate-400 mt-8 px-4">
				Data provided by{" "}
				<a
					href="https://www.themoviedb.org/"
					target="_blank"
					rel="noreferrer"
					className="underline hover:text-sky-600"
				>
					TMDB
				</a>
				. This product uses the TMDB API but is not endorsed or certified by TMDB.
			</p>
		</section>
	);
};

export default Browse;
