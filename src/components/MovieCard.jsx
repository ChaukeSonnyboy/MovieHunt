import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	const { id, poster_path } = movie;
	const movieProfileImage = poster_path
		? `https://image.tmdb.org/t/p/w500/${poster_path}`
		: "";

	return (
		<>
			<div
				className="max-w-sm border-2 border-transparent hover:border-sky-500 hover:scale-105
				transition-transform duration-300 ease-in-out
				rounded-t-lg "
			>
				<Link to={`/movie/${id}`}>
					<img className="rounded-t-lg " src={movieProfileImage} alt="" />
				</Link>
			</div>
		</>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number.isRequired,
		poster_path: PropTypes.string.isRequired,
	}).isRequired,
};

export default MovieCard;
