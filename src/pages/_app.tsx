import { Provider as AuthProvider } from "next-auth/client";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "../components/Layout/Layout";

import "../styles/globals.css";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
	const store = useStore((state) => state);

	return (
		<PersistGate loading={null} persistor={store.__persistor}>
			<AuthProvider session={pageProps.session}>
				<Layout {...pageProps}>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</PersistGate>
	);
}

export default wrapper.withRedux(MyApp);
