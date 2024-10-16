import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";
import PropTypes from "prop-types";

const Movies = ({ apiPath, title }) => {
	const { fetchedData: moviesList } = useFetch(apiPath); // console.log(moviesList);
	useTitle(title);

	const sortedMoviesList = [...moviesList].sort(
		(a, b) => new Date(b.release_date) - new Date(a.release_date)
	);

	return (
		<section className=" ">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto p-5  w-4/5 ">
				{sortedMoviesList.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
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
