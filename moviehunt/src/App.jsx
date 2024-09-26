import Footer from "./components/Footer";
import Header from "./components/Header";
import WebRoutes from "./routes/WebRoutes";

const App = () => {
	return (
		<>
			<Header />
			<main className="min-h-screen">
				<WebRoutes />
			</main>
			<Footer />
		</>
	);
};

export default App;
