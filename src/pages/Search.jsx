import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import useTitle from "../hooks/useTitle";

const Search = ({ apiPath }) => {
	const [searchParams] = useSearchParams();
	const myQuery = searchParams.get("q");
	useTitle(`Results for ${myQuery}`);

	const { fetchedData: moviesList } = useFetch(apiPath, myQuery);

	return (
		<section className="">
			<p className=" ml-3 text-2xl font-semibold">
				{moviesList.length === 0
					? `No results found for "${myQuery}"`
					: moviesList.length === 1
					? `${moviesList.length} Result found for "${myQuery}"`
					: `${moviesList.length} Results found for "${myQuery}"`}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto p-5  w-4/5">
				{moviesList.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
};

Search.propTypes = {
	apiPath: PropTypes.string.isRequired,
};

export default Search;
