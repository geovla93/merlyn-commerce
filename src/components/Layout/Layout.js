import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-100">
			<Header />
			<main className="flex flex-col flex-1 w-11/12 lg:w-5/6 mx-auto text-center space-y-4">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
