import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import { FaBars } from "react-icons/fa";

const Header = () => {
	const navigate = useNavigate();
	const activeLink =
		"block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 ";
	const nonActiveLink =
		"block py-2 px-3 text-black rounded hover:bg-sky-300 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 ";

	const handleSubmit = (event) => {
		event.preventDefault();
		const userQuery = event.target.search.value;
		event.target.reset();

		return navigate(`/search?q=${userQuery}`);
	};

	return (
		<header>
			<nav>
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
					<Link
						to="/"
						// className="flex items-center space-x-3 rtl:space-x-reverse border-2 border-red-700"
						className="text-2xl font-semibold "
					>
						MovieHunt
					</Link>

					<div className="flex md:order-2 ">
						<button
							type="button"
							data-collapse-toggle="navbar-search"
							aria-controls="navbar-search"
							aria-expanded="false"
							className="md:hidden text-black hover:bg-sky-400 rounded-md text-md p-2.5 me-1"
						>
							<FaSearch className="w-6 h-6" />

							<span className="sr-only ">Search</span>
						</button>

						<div className="relative hidden md:block">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<CiSearch className="w-6 h-6 text-black" />

								<span className="sr-only">Search icon</span>
							</div>
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									id="search"
									name="search"
									className="block w-full p-2 ps-10 text-sm text-black border border-sky-500 rounded-full  focus:outline-none"
									placeholder="Search Movie"
								/>
							</form>
						</div>
						<button className="inline-flex items-center p-2 justify-center text-black rounded-lg md:hidden hover:bg-sky-400 focus:outline-none ">
							<FaBars className="w-6 h-6" />

							<span className="sr-only">Open main menu</span>
						</button>
					</div>
					<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ">
						<div className="relative mt-3 md:hidden border border-green-500">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<FaSearch className="w-6 h-6" />
							</div>
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									id="search-navbar"
									className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  "
									placeholder="Search..."
								/>
							</form>
						</div>
						<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
							<li>
								<NavLink
									to="/"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/movies/popular"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Popular
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/movies/top"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Top Rated
								</NavLink>
							</li>
							<li>
								<NavLink
									to="movies/upcoming"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Upcoming
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
