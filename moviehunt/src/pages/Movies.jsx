import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

const Movies = ({ apiPath }) => {
	// const [moviesList, setMoviesList] = useState([]); //initially the movieslist array is empty

	const { fetchedData: moviesList } = useFetch(apiPath);

	// console.log(moviesList);

	return (
		<section className=" ">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto p-5  w-4/5">
				{moviesList.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
};

export default Movies;
