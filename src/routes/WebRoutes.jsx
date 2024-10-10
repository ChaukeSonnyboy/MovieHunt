import { Routes, Route } from "react-router-dom";
import Movies from "../pages/Movies";
import MovieInfo from "../pages/MovieInfo";
import Search from "../pages/Search";
import PageNotFound from "../pages/PageNotFound";

const WebRoutes = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Movies apiPath="movie/now_playing" title="MovieHunt" />}
				/>
				<Route path="movie/:id" element={<MovieInfo />} />

				<Route
					path="movies/popular"
					element={<Movies apiPath="movie/popular" title="Popular Movies" />}
				/>
				<Route
					path="movies/top"
					element={
						<Movies apiPath="movie/top_rated" title="Top Rated Movies" />
					}
				/>
				<Route
					path="movies/upcoming"
					element={<Movies apiPath="movie/upcoming" title="Upcoming Movies" />}
				/>
				<Route path="search" element={<Search apiPath="search/movie" />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
};

export default WebRoutes;
