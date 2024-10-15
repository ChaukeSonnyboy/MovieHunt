import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
	const [openSearchBar, setOpenSearchBar] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const navigate = useNavigate();

	const activeLink =
		"block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 ";
	const nonActiveLink =
		"block py-2 px-3 text-black rounded hover:bg-sky-300 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 ";

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
		<div className="absolute top-0 right-0 p-2  border border-sky-500 rounded-xl w-60 text-center bg-white">
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
				<div className="relative max-w-screen-xl h-20 flex items-center justify-between mx-auto p-4">
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
						<div className="relative hidden md:block">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									id="search"
									name="search"
									className="p-2 ps-5 text-md border border-sky-500 rounded-full focus:outline-none bg-sky-100"
									placeholder="Search Movie"
								/>
								<button
									type="submit"
									className="absolute top-0 bottom-0 right-0 flex items-center pe-3"
								>
									<CiSearch className="w-6 h-6 text-sky-700" />
								</button>
							</form>
						</div>

						{/* Menu toggle button for mobile */}
						<div>
							{openMenu ? (
								collapsedNav
							) : (
								<button
									aria-label="Toggle Menu"
									className="p-2 rounded-lg bg-sky-400 focus:outline-none md:hidden border hover:text-sky-400 hover:border-sky-400 hover:bg-transparent"
								>
									<FaBars
										className="w-6 h-6"
										onClick={() => setOpenMenu(!openMenu)}
									/>
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
