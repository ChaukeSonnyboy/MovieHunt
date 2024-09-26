import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

const Search = ({ apiPath }) => {
	const [searchParams] = useSearchParams();
	const myQuery = searchParams.get("q");

	const { fetchedData: moviesList } = useFetch(apiPath, myQuery);

	return (
		<section className="">
			<div className="flex justify-start flex-wrap gap-5 borde-2 mx-auto p-5">
				{moviesList.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
};

export default Search;
