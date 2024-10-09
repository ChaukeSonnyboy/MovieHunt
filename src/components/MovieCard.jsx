import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	const { id, title, overview, poster_path } = movie;
	const movieProfileImage = `https://image.tmdb.org/t/p/w500/${poster_path}`;

	return (
		<>
			<div
				className="max-w-sm  border-2 hover:border-sky-500 hover:scale-105 transition-transform duration-300 ease-in-out
  rounded-lg grid grid-rows-subgrid row-span-2"
			>
				<Link to={`movie/${id}`}>
					<img className="rounded-t-lg " src={movieProfileImage} alt="" />

					<div className="p-5">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center ">
							{title}
						</h5>
						{/* <p className="mb-3 font-normal text-gray-700">{overview.substring(0,100)}</p> */}
					</div>
				</Link>
			</div>
		</>
	);
};

export default MovieCard;
