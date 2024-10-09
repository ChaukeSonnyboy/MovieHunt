import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

const Search = ({ apiPath }) => {
	const [searchParams] = useSearchParams();
	const myQuery = searchParams.get("q");

	const { fetchedData: moviesList } = useFetch(apiPath, myQuery);

	return (
		<section className="border-2 border-zinc-950">
			<div className="flex justify-center flex-wrap gap-5 borde-2 mx-auto p-5  border-2 border-red-600 w-4/5">
				{moviesList.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
};

export default Search;
