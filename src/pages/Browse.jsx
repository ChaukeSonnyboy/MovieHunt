import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";
import { todayISO, daysAgoISO } from "../lib/dates";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

const SORT_OPTIONS = [
	{ value: "primary_release_date.desc", label: "Newest first" },
	{ value: "primary_release_date.asc", label: "Oldest first" },
	{ value: "popularity.desc", label: "Popularity" },
	{ value: "vote_average.desc", label: "Highest rated" },
];

const Browse = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [queryInput, setQueryInput] = useState(() => searchParams.get("q") || "");
	const [filtersOpen, setFiltersOpen] = useState(false);

	useEffect(() => {
		setQueryInput(searchParams.get("q") || "");
	}, [searchParams]);

	const page = Math.max(1, Number(searchParams.get("page")) || 1);
	const q = (searchParams.get("q") || "").trim();
	const yearParam = searchParams.get("year");
	const genreParam = searchParams.get("genre");
	const sortBy = searchParams.get("sort") || "primary_release_date.desc";

	const year = yearParam ? Number(yearParam) : null;
	const genre = genreParam || "";

	const isSearchMode = Boolean(q);

	const discoverParams = useMemo(() => {
		const p = {
			page,
			sort_by: sortBy,
			include_adult: false,
			include_video: false,
		};
		if (year) {
			p.primary_release_year = year;
			p["primary_release_date.lte"] = todayISO();
		} else {
			p["primary_release_date.gte"] = daysAgoISO(90);
			p["primary_release_date.lte"] = todayISO();
		}
		if (genre) p.with_genres = genre;
		return p;
	}, [page, year, genre, sortBy]);

	const searchParamsApi = useMemo(
		() => ({ query: q, page }),
		[q, page]
	);

	const discoverQuery = useTmdb("discover/movie", discoverParams, {
		enabled: !isSearchMode,
	});
	const searchQuery = useTmdb("search/movie", searchParamsApi, {
		enabled: isSearchMode,
	});

	const active = isSearchMode ? searchQuery : discoverQuery;
	const { loading, error, totalPages, totalResults } = active;
	const rawList = active.results;

	const todayStr = todayISO();
	const movies = useMemo(() => {
		if (isSearchMode) return rawList;
		return rawList.filter(
			(m) => m.release_date && m.release_date <= todayStr
		);
	}, [rawList, isSearchMode, todayStr]);

	const { results: genreList } = useTmdb("genre/movie/list", {});

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	useTitle("Explore");

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

	const onSubmitSearch = (e) => {
		e.preventDefault();
		const next = new URLSearchParams(searchParams);
		const trimmed = queryInput.trim();
		if (trimmed) {
			next.set("q", trimmed);
		} else {
			next.delete("q");
		}
		next.delete("page");
		setSearchParams(next);
	};

	const clearAll = () => {
		setQueryInput("");
		setSearchParams({});
	};

	const yearOptions = useMemo(() => {
		const cy = new Date().getFullYear();
		const arr = [];
		for (let y = cy; y >= 1950; y--) arr.push(y);
		return arr;
	}, []);

	return (
		<section className="pb-10">
			<div className="max-w-7xl mx-auto px-4 pt-6">
				<h1 className="text-3xl font-bold text-slate-900">Explore</h1>
				<p className="mt-1 text-slate-600 text-sm">
					Search by title, or choose genre, year, and sort.
				</p>

				<form
					onSubmit={onSubmitSearch}
					className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
				>
					<div className="flex flex-col lg:flex-row gap-3 lg:items-end">
						<label className="flex-1 flex flex-col gap-1 text-sm font-medium text-slate-700">
							Search titles
							<input
								type="search"
								value={queryInput}
								onChange={(e) => setQueryInput(e.target.value)}
								placeholder="Type a movie name…"
								className="rounded-lg border border-slate-300 px-3 py-2 w-full"
							/>
						</label>
						<button
							type="submit"
							className="rounded-lg bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 lg:self-end"
						>
							Search
						</button>
					</div>

					<button
						type="button"
						className="mt-3 flex w-full items-center justify-center rounded-lg border border-sky-500 bg-sky-50 px-4 py-2.5 text-sm font-medium text-sky-900 hover:bg-sky-100 md:hidden"
						onClick={() => setFiltersOpen((o) => !o)}
						aria-expanded={filtersOpen}
						aria-controls="explore-filters"
					>
						{filtersOpen ? "Hide filters" : "Show filters"}
					</button>

					<div
						id="explore-filters"
						className={`flex flex-col gap-2 ${
							filtersOpen ? "" : "hidden md:flex"
						}`}
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
						<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
							Genre
							<select
								value={genre}
								disabled={isSearchMode}
								onChange={(e) => setParam("genre", e.target.value)}
								className="rounded-lg border border-slate-300 px-3 py-2 bg-white disabled:opacity-50"
							>
								<option value="">All</option>
								{genreList.map((g) => (
									<option key={g.id} value={String(g.id)}>
										{g.name}
									</option>
								))}
							</select>
						</label>
						<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
							Year
							<select
								value={yearParam || ""}
								disabled={isSearchMode}
								onChange={(e) => setParam("year", e.target.value)}
								className="rounded-lg border border-slate-300 px-3 py-2 bg-white disabled:opacity-50"
							>
								<option value="">Any</option>
								{yearOptions.map((y) => (
									<option key={y} value={String(y)}>
										{y}
									</option>
								))}
							</select>
						</label>
						<label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
							Sort
							<select
								value={sortBy}
								disabled={isSearchMode}
								onChange={(e) => setParam("sort", e.target.value)}
								className="rounded-lg border border-slate-300 px-3 py-2 bg-white disabled:opacity-50"
							>
								{SORT_OPTIONS.map((o) => (
									<option key={o.value} value={o.value}>
										{o.label}
									</option>
								))}
							</select>
						</label>
						<button
							type="button"
							onClick={clearAll}
							className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
						>
							Clear all
						</button>
						</div>
					{isSearchMode ? (
						<p className="text-xs text-slate-500">
							Genre, year, and sort apply to browse mode only. Clear the search box and
							submit empty to use filters.
						</p>
					) : null}
					</div>
				</form>

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
				<p className="text-center py-12 text-slate-500">Loading…</p>
			) : null}

			{!loading && movies.length === 0 && !error ? (
				<p className="text-center py-12 text-slate-500">Nothing found. Try another search or filter.</p>
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
				Data from{" "}
				<a
					href="https://www.themoviedb.org/"
					target="_blank"
					rel="noreferrer"
					className="underline hover:text-sky-600"
				>
					TMDB
				</a>
				.
			</p>
		</section>
	);
};

export default Browse;
