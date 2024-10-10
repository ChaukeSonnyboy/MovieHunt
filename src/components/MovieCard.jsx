import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	const { id, title, overview, poster_path } = movie;
	const movieProfileImage = `https://image.tmdb.org/t/p/w500/${poster_path}`;

	return (
		<>
			<div
				className="max-w-sm  border-2  hover:border-sky-500 hover:scale-105 transition-transform duration-300 ease-in-out
  rounded-t-lg "
			>
				<Link to={`/movie/${id}`}>
					<img className="rounded-t-lg " src={movieProfileImage} alt="" />
				</Link>
			</div>
		</>
	);
};

export default MovieCard;
