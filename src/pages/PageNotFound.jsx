import { BiSolidError } from "react-icons/bi";

const PageNotFound = () => {
	return (
		<main>
			<section className="w-1/4 m-auto border border-red-600">
				<BiSolidError className="w-96 h-96 text-red-600" />
				Oops!!! Page Not Found!!!
			</section>
		</main>
	);
};

export default PageNotFound;
