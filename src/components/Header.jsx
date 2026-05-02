import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Header = () => {
	const [openSearchBar, setOpenSearchBar] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [searchHint, setSearchHint] = useState("");
	const navigate = useNavigate();

	const activeLink =
		"block py-2 px-3 text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 ";
	const nonActiveLink =
		" block py-2 px-3 text-black rounded md:border-0 border-b border-sky-500 hover:bg-sky-300 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 ";

	const handleSubmit = (event) => {
		event.preventDefault();
		const userQuery = event.target.search.value.trim();

		if (!userQuery) {
			setSearchHint("Enter a movie name to search.");
			return;
		}
		setSearchHint("");
		event.target.reset();
		navigate(`/search?q=${encodeURIComponent(userQuery)}`);
	};

	const collapsedNav = (
		<div className="absolute top-0 right-0 z-20 p-2 mt-5 mr-3 border  border-sky-500 bg-slate-200 rounded-xl w-60 text-center md:hidden">
			<IoCloseSharp
				aria-label="Close Menu"
				className="w-8 h-8 ml-auto mr-1 mt-1 text-red-500 md:text-black hover:text-red-600 border border-red-500 md:border-black hover:border-red-600 rounded-full cursor-pointer"
				onClick={() => setOpenMenu(!openMenu)}
			/>
			<ul className="flex flex-col mt-2 gap-2 font-semibold">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? activeLink : nonActiveLink
						}
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/browse"
						className={({ isActive }) =>
							isActive ? activeLink : nonActiveLink
						}
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
					>
						Explore
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/movies/popular"
						className={({ isActive }) =>
							isActive ? activeLink : nonActiveLink
						}
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
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
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
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
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
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
				<div className="relative max-w-screen-xl h-20 flex items-center justify-between mx-auto p-4 md:border-b md:rounded-3xl md:border-sky-400  bg-sky-400 md:bg-transparent">
					<Link to="/" className="text-2xl font-semibold">
						MovieHunt
					</Link>

					<div className="hidden md:flex">
						<ul className="flex gap-6 lg:gap-8 font-semibold flex-wrap items-center">
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
									to="/browse"
									className={({ isActive }) =>
										isActive ? activeLink : nonActiveLink
									}
								>
									Explore
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
						<div className="hidden md:block min-w-[200px]">
							<SearchBar handleSubmit={handleSubmit} isMobile={false} />
							{searchHint ? (
								<p className="text-red-700 text-xs mt-1" role="status">
									{searchHint}
								</p>
							) : null}
						</div>

						<button
							type="button"
							className={` ${
								openSearchBar
									? "text-sky-600 bg-sky-200 rounded-full pe-2 ps-2"
									: "text-black"
							}`}
							aria-expanded={openSearchBar}
							aria-controls="mobile-search"
						>
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
									type="button"
									className="p-2 rounded-lg focus:outline-none md:hidden"
								>
									<FaBars
										className="w-7 h-7"
										onClick={() => {
											setOpenMenu(!openMenu);
										}}
									/>
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>

			{openMenu ? (
				""
			) : (
				<div
					id="mobile-search"
					className={` ${
						openSearchBar ? "block" : "hidden"
					} w-full md:hidden p-4 relative z-10`}
				>
					<SearchBar
						handleSubmit={handleSubmit}
						isMobile={true}
						shouldFocus={openSearchBar}
					/>
					{searchHint ? (
						<p className="text-red-700 text-xs mt-1" role="status">
							{searchHint}
						</p>
					) : null}
				</div>
			)}
		</header>
	);
};

export default Header;
