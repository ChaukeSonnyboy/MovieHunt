import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const sizeToPath = {
	w300: "w300",
	w342: "w342",
	w500: "w500",
};

/**
 * @param {{ movie: object, genreMap?: Record<number,string>, imageSize?: keyof typeof sizeToPath }} props
 */
const MovieCard = ({ movie, genreMap, imageSize = "w342" }) => {
	const { id, poster_path, title, release_date, genre_ids } = movie;
	const sizeKey = sizeToPath[imageSize] || "w342";
	const movieProfileImage = poster_path
		? `https://image.tmdb.org/t/p/${sizeKey}/${poster_path}`
		: "";

	const year =
		release_date && typeof release_date === "string"
			? release_date.slice(0, 4)
			: "";

	const chipIds = (genre_ids || []).slice(0, 2);

	return (
		<article className="flex flex-col max-w-sm border-2 border-transparent hover:border-sky-500 hover:scale-[1.02] transition-transform duration-300 ease-in-out rounded-t-lg bg-white shadow-sm overflow-hidden">
			<Link to={`/movie/${id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-t-lg">
				{movieProfileImage ? (
					<img
						className="w-full aspect-[2/3] object-cover rounded-t-lg bg-slate-200"
						src={movieProfileImage}
						alt={title ? `Poster for ${title}` : "Movie poster"}
						loading="lazy"
						decoding="async"
					/>
				) : (
					<div
						className="w-full aspect-[2/3] bg-slate-200 flex items-center justify-center text-slate-500 text-sm p-2 text-center rounded-t-lg"
						role="img"
						aria-label={title ? `No poster for ${title}` : "No poster"}
					>
						No poster
					</div>
				)}
			</Link>
			<div className="p-2 flex flex-col gap-1 min-h-[4.5rem]">
				<h2 className="font-semibold text-slate-900 line-clamp-2 text-sm leading-snug">
					<Link to={`/movie/${id}`} className="hover:text-sky-600">
						{title || "Untitled"}
					</Link>
				</h2>
				{year ? <p className="text-xs text-slate-500">{year}</p> : null}
				{chipIds.length > 0 && genreMap ? (
					<div className="flex flex-wrap gap-1">
						{chipIds.map((gid) => (
							<span
								key={gid}
								className="text-[10px] uppercase tracking-wide rounded bg-sky-100 text-sky-900 px-1.5 py-0.5"
							>
								{genreMap[gid] || ""}
							</span>
						))}
					</div>
				) : null}
			</div>
		</article>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		id: PropTypes.number.isRequired,
		poster_path: PropTypes.string,
		title: PropTypes.string,
		release_date: PropTypes.string,
		genre_ids: PropTypes.arrayOf(PropTypes.number),
	}).isRequired,
	genreMap: PropTypes.objectOf(PropTypes.string),
	imageSize: PropTypes.oneOf(["w300", "w342", "w500"]),
};

export default MovieCard;
