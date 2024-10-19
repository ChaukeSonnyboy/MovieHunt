import { useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

const SearchBar = ({ handleSubmit, isMobile, shouldFocus }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (shouldFocus) {
			inputRef.current.focus();
		}
	}, [shouldFocus]);

	return (
		<form
			onSubmit={handleSubmit}
			className={`relative ${isMobile ? "flex" : ""}`}
		>
			<input
				ref={inputRef}
				type="text"
				id="search"
				name="search"
				className={`p-2 ps-5 text-md border border-sky-500 rounded-full focus:outline-none bg-sky-100 ${
					isMobile ? "flex-grow" : ""
				}`}
				placeholder="Search Movie"
			/>
			<button
				type="submit"
				className={`absolute top-0 bottom-0 right-0 flex items-center pe-2 ps-2 bg-sky-300 border rounded-full `}
			>
				<CiSearch className="w-6 h-6 text-sky-700" />
			</button>
		</form>
	);
};

// Prop validation
SearchBar.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	isMobile: PropTypes.bool,
	shouldFocus: PropTypes.bool,
};

// Default props
SearchBar.defaultProps = {
	isMobile: false,
	shouldFocus: false,
};

export default SearchBar;
