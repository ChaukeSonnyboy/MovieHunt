import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { useTmdb } from "../hooks/useTmdb";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";
import PropTypes from "prop-types";

const LIST_GRID =
	"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 py-5";

const Movies = ({ apiPath, title }) => {
	const { fetchedData: moviesList, loading, error } = useFetch(apiPath);
	const { results: genreList } = useTmdb("genre/movie/list", {});

	useTitle(title);

	const genreMap = useMemo(() => {
		const m = {};
		for (const g of genreList) {
			m[g.id] = g.name;
		}
		return m;
	}, [genreList]);

	const sortedMoviesList = [...moviesList].sort(
		(a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
	);

	return (
		<section className="pb-10">
			<div className="max-w-7xl mx-auto px-4 pt-6">
				<h1 className="text-3xl font-bold text-slate-900">{title}</h1>
				{error ? (
					<p className="mt-4 text-red-600" role="alert">
						{error}
					</p>
				) : null}
				<p className="mt-2 text-slate-600">
					{loading ? "Loading…" : `${sortedMoviesList.length} titles (this page)`}
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
		</section>
	);
};

Movies.propTypes = {
	apiPath: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Movies;
