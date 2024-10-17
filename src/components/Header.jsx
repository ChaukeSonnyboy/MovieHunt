import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar"; // Import the reusable SearchBar component

const Header = () => {
	const [openSearchBar, setOpenSearchBar] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const navigate = useNavigate();

	const activeLink =
		"block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 ";
	const nonActiveLink =
		" block py-2 px-3 text-black rounded md:border-0 border-b border-sky-500 hover:bg-sky-300 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 ";

	const handleSubmit = (event) => {
		event.preventDefault();
		const userQuery = event.target.search.value;

		if (!userQuery) {
			alert("Please Enter a Valid Movie Name to Search.");
			return;
		}
		event.target.reset();
		return navigate(`/search?q=${userQuery}`);
	};

	const collapsedNav = (
		<div className="absolute top-0 right-0 z-20 p-2 mt-5 mr-3 border  border-sky-500 bg-slate-200 rounded-xl w-60 text-center md:hidden">
			<IoCloseSharp
				aria-label="Close Menu"
				className="w-8 h-8 ml-auto mr-1 mt-1 hover:text-red-600 border border-black hover:border-red-600 rounded-full cursor-pointer"
				onClick={() => setOpenMenu(!openMenu)}
			/>
			<ul className="flex flex-col mt-2 gap-2 font-semibold">
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
						to="/movies/upcoming"
						className={({ isActive }) =>
							isActive ? activeLink : nonActiveLink
						}
					>
						Upcoming
					</NavLink>
				</li>
			</ul>
		</div>
	);

	return (
		<header>
			<nav>
				<div className="relative max-w-screen-xl h-20 flex items-center justify-between mx-auto p-4 md:border-b rounded-3xl md:border-sky-400 mt-2">
					<Link to="/" className="text-2xl font-semibold">
						MovieHunt
					</Link>

					{/* Navigation menu/links */}
					<div className="hidden md:flex">
						<ul className="flex gap-8 font-semibold">
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
									to="/movies/upcoming"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Upcoming
								</NavLink>
							</li>
						</ul>
					</div>

					<div className="flex md:order-2">
						{/* Search bar on larger devices */}
						<div className="hidden md:block">
							<SearchBar handleSubmit={handleSubmit} isMobile={false} />
						</div>

						{/* Menu toggle button for mobile */}

						<button className="p-1 hover:text-sky-500 ">
							<FiSearch
								className=" md:hidden w-7 h-7 "
								onClick={() => setOpenSearchBar(!openSearchBar)}
							/>
						</button>

						<div>
							{openMenu ? (
								collapsedNav
							) : (
								<button
									aria-label="Toggle Menu"
									className="p-2 rounded-lg bg-sky-400 focus:outline-none md:hidden border
									hover:text-sky-400 hover:border-sky-400 hover:bg-transparent"
								>
									<FaBars
										className="w-6 h-6"
										onClick={() => {
											setOpenMenu(!openMenu);
										}}
									/>
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Searchbar for mobile devices */}
			</nav>

			{openMenu ? (
				""
			) : (
				<div
					className={` ${
						openSearchBar ? "hidden" : "block"
					} w-full md:hidden p-4 relative z-10`}
				>
					<SearchBar handleSubmit={handleSubmit} isMobile={true} />{" "}
				</div>
			)}
		</header>
	);
};

export default Header;
