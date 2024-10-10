import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import useTitle from "../hooks/useTitle";
import { FaExternalLinkAlt } from "react-icons/fa";

const MovieInfo = () => {
	const params = useParams();
	const [movie, setMovie] = useState({});
	useTitle(movie.title);

	const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

	useEffect(() => {
		const key = import.meta.env.VITE_API_KEY;

		async function fetchMovie() {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`
			);
			const json = await response.json();
			setMovie(json);
			console.log(json);
		}
		fetchMovie();
	}, [params.id]);

	return (
		<section className="flex justify-center gap-10 flex-wrap py-5">
			<div className="max-w-sm ">
				<img className="rounded-t-xl" src={image} alt={movie.title} />
			</div>

			<div className="max-w-2xl text-lg px-5">
				<h1 className="text-4xl font-bold my-3 text-center lg:text-left">
					{movie.title}
				</h1>

				<p className="my-4">{movie.overview}</p>

				{movie.genres ? (
					<p className="my-7 flex flex-wrap gap-2">
						{movie.genres.map((genre) => (
							<span
								className="mr-2 border border-sky-500 rounded p-2 
								"
								key={genre.id}
							>
								{genre.name}
							</span>
						))}
					</p>
				) : (
					""
				)}

				<div className="flex items-center">
					<MdStarRate className="w-6 h-6 text-yellow-400" />

					<p className="ml-2 text-black ">{movie.vote_average}</p>

					<span className="w-1 h-1 mx-1.5 bg-black rounded-full"></span>
					<span className="text-black">{movie.vote_count} reviews</span>
				</div>

				<p className="my-4">
					<span className="mr-2 font-bold">Runtime:</span>
					<span>{movie.runtime} Minutes.</span>
				</p>

				<p className="my-4">
					<span className="mr-2 font-bold">Budget:</span>
					<span>{movie.budget}</span>
				</p>

				<p className="my-4">
					<span className="mr-2 font-bold">Revenue:</span>
					<span>{movie.revenue}</span>
				</p>

				<p className="my-4">
					<span className="mr-2 font-bold">Release Date:</span>
					<span>{movie.release_date}</span>
				</p>

				<p className="my-4 ">
					<span className="mr-2 font-bold">IMDB Code:</span>
					<a
						href={`https://www.imdb.com/title/${movie.imdb_id}`}
						target="_blank"
						rel="noreferrer"
						className="hover:text-sky-500 hover:underline inline-flex items-center gap-1 "
					>
						<span> {movie.imdb_id}</span>
						<FaExternalLinkAlt className="w-4 h-4 " />
					</a>
				</p>
			</div>
		</section>
	);
};

export default MovieInfo;
