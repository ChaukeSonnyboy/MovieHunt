import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import useTitle from "../hooks/useTitle";
import { FaExternalLinkAlt } from "react-icons/fa";

const OVERVIEW_COLLAPSE_CHARS = 420;

const MovieInfo = () => {
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [movie, setMovie] = useState({});
	const [overviewExpanded, setOverviewExpanded] = useState(false);

	useTitle(movie.title);

	const image = movie.poster_path
		? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
		: "";

	const overview = movie.overview || "";
	const needsOverviewToggle = overview.length > OVERVIEW_COLLAPSE_CHARS;
	const overviewDisplay =
		!needsOverviewToggle || overviewExpanded
			? overview
			: `${overview.slice(0, OVERVIEW_COLLAPSE_CHARS).trim()}…`;

	useEffect(() => {
		setOverviewExpanded(false);
	}, [params.id]);

	useEffect(() => {
		const key = import.meta.env.VITE_API_KEY;

		async function fetchMovie() {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`
			);
			const json = await response.json();
			setMovie(json);
		}
		fetchMovie();
	}, [params.id]);

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate(location.state?.from || "/");
		}
	};

	return (
		<section className="max-w-6xl mx-auto px-4 py-8 md:py-12">
			<div className="mb-6">
				<button
					type="button"
					onClick={handleBack}
					className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
				>
					<IoArrowBack className="w-5 h-5" aria-hidden />
					Back
				</button>
			</div>

			<div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12">
				<div className="w-full max-w-sm mx-auto lg:mx-0 shrink-0">
					{image ? (
						<img
							className="rounded-xl w-full object-cover shadow-md"
							src={image}
							alt={movie.title ? `Poster for ${movie.title}` : "Movie poster"}
						/>
					) : (
						<div
							className="rounded-xl w-full aspect-[2/3] bg-slate-200 flex items-center justify-center text-slate-500"
							role="img"
							aria-label="No poster available"
						>
							No poster
						</div>
					)}
				</div>

				<div className="flex-1 min-w-0 max-w-2xl text-base md:text-lg">
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center lg:text-left">
						{movie.title}
					</h1>

					<div className="my-4 text-slate-700 leading-relaxed min-h-[5rem] md:min-h-[6rem]">
						<p className="whitespace-pre-line">{overviewDisplay}</p>
						{needsOverviewToggle ? (
							<button
								type="button"
								onClick={() => setOverviewExpanded(!overviewExpanded)}
								className="mt-2 text-sky-600 font-medium hover:underline text-base"
							>
								{overviewExpanded ? "Show less" : "Read more"}
							</button>
						) : null}
					</div>

					{movie.genres ? (
						<p className="my-6 flex flex-wrap gap-2">
							{movie.genres.map((genre) => (
								<span
									className="border border-sky-500 rounded px-2 py-1 text-sm"
									key={genre.id}
								>
									{genre.name}
								</span>
							))}
						</p>
					) : null}

					<div className="flex items-center text-slate-900">
						<MdStarRate className="w-6 h-6 text-yellow-400 shrink-0" />
						<p className="ml-2">{movie.vote_average}</p>
						<span className="w-1 h-1 mx-1.5 bg-slate-700 rounded-full shrink-0" />
						<span>{movie.vote_count} reviews</span>
					</div>

					<p className="my-4 text-slate-800">
						<span className="mr-2 font-bold">Runtime:</span>
						<span>{movie.runtime} minutes</span>
					</p>

					<p className="my-4 text-slate-800">
						<span className="mr-2 font-bold">Budget:</span>
						<span>{movie.budget}</span>
					</p>

					<p className="my-4 text-slate-800">
						<span className="mr-2 font-bold">Revenue:</span>
						<span>{movie.revenue}</span>
					</p>

					<p className="my-4 text-slate-800">
						<span className="mr-2 font-bold">Release date:</span>
						<span>{movie.release_date}</span>
					</p>

					{movie.imdb_id ? (
						<p className="my-4 text-slate-800">
							<span className="mr-2 font-bold">IMDb:</span>
							<a
								href={`https://www.imdb.com/title/${movie.imdb_id}`}
								target="_blank"
								rel="noreferrer"
								className="hover:text-sky-600 hover:underline inline-flex items-center gap-1"
							>
								<span>{movie.imdb_id}</span>
								<FaExternalLinkAlt className="w-4 h-4" />
							</a>
						</p>
					) : null}

					<p className="mt-6">
						<Link to="/browse" className="text-sky-600 font-medium hover:underline">
							Explore more movies
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default MovieInfo;
