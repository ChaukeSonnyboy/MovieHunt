import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Browse from "../pages/Browse";
import MovieInfo from "../pages/MovieInfo";
import Search from "../pages/Search";
import PageNotFound from "../pages/PageNotFound";

const WebRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="browse" element={<Browse />} />
				<Route path="movie/:id" element={<MovieInfo />} />

				<Route
					path="movies/popular"
					element={<Movies title="Popular movies" discoverKind="popular" />}
				/>
				<Route
					path="movies/top"
					element={<Movies title="Top rated movies" discoverKind="top" />}
				/>
				<Route
					path="movies/upcoming"
					element={<Movies title="Upcoming movies" discoverKind="upcoming" />}
				/>
				<Route path="search" element={<Search apiPath="search/movie" />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
};

export default WebRoutes;
