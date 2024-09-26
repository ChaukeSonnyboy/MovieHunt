import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	const { id, title, overview, poster_path } = movie;
	const movieProfileImage = `https://image.tmdb.org/t/p/w500/${poster_path}`;

	return (
		<>
			<Link to={`movie/${id}`}>
				<div className="max-w-sm  border border-sky-500 rounded-lg">
					<img className="rounded-t-lg " src={movieProfileImage} alt="" />

					<div className="p-5">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
							{title}
						</h5>
						<p className="mb-3 font-normal text-gray-700">{overview}</p>
					</div>
				</div>
			</Link>
		</>
	);
};

export default MovieCard;
