import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";

const GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4";

const Home = () => {
	useTitle("MovieHunt");

	const { results: nowPlaying, loading: loadingNow, error: errNow } = useTmdb(
		"movie/now_playing",
		{ page: 1 }
	);
	const { results: upcomingRaw, loading: loadingUp, error: errUp } = useTmdb(
		"movie/upcoming",
		{ page: 1 }
	);
	const { results: genreList } = useTmdb("genre/movie/list", {});

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	const sortedNow = useMemo(
		() =>
			[...nowPlaying].sort(
				(a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
			),
		[nowPlaying]
	);

	const upcomingPreview = useMemo(() => upcomingRaw.slice(0, 8), [upcomingRaw]);

	const loading = loadingNow || loadingUp;
	const error = errNow || errUp;

	return (
		<section>
			<div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
				<h1 className="text-3xl font-bold text-slate-900">Find new &amp; now-playing films</h1>
				<p className="mt-2 text-slate-600 max-w-2xl">
					In theaters and new to streaming near you. Filter by release date, year, or genre on{" "}
					<Link to="/browse" className="text-sky-600 font-medium hover:underline">
						Browse
					</Link>
					.
				</p>
				{error ? (
					<p className="mt-4 text-red-600" role="alert">
						{error}
					</p>
				) : null}
			</div>

			<div className="max-w-7xl mx-auto px-4 py-2">
				<h2 className="text-xl font-semibold text-slate-800 mb-3">Now playing</h2>
				{loading && sortedNow.length === 0 ? (
					<p className="text-slate-500 py-8">Loading…</p>
				) : (
					<div className={GRID}>
						{sortedNow.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								genreMap={genreMap}
								imageSize="w342"
							/>
						))}
					</div>
				)}
			</div>

			<div className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-200 mt-6">
				<div className="flex flex-wrap items-end justify-between gap-2 mb-3">
					<h2 className="text-xl font-semibold text-slate-800">Upcoming</h2>
					<Link
						to="/movies/upcoming"
						className="text-sm font-medium text-sky-600 hover:underline"
					>
						See all upcoming
					</Link>
				</div>
				{loading && upcomingPreview.length === 0 ? null : (
					<div className={GRID}>
						{upcomingPreview.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								genreMap={genreMap}
								imageSize="w342"
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Home;
