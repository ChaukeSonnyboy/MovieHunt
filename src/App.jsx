import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import WebRoutes from "./routes/WebRoutes";

const App = () => {
	return (
		<>
			<ScrollToTop />
			<Header />
			<main className="min-h-screen">
				<WebRoutes />
			</main>
			<Footer />
		</>
	);
};

export default App;
