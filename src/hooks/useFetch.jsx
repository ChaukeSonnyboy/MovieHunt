import { useState, useEffect } from "react";

const useFetch = (apiPath, myQuery = "") => {
	const [fetchedData, setFetchedData] = useState([]);
	const key = import.meta.env.VITE_API_KEY;
	const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${myQuery}`;

	useEffect(() => {
		async function fetchMovies() {
			const res = await fetch(url);
			const data = await res.json();

			setFetchedData(data.results);
		}

		fetchMovies();
	}, [url]);
	

	return { fetchedData };
};

export default useFetch;
