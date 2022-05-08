import Head from "next/head";

import CheckoutInner from "../../components/CheckoutInner/CheckoutInner";

const CheckoutPage = () => {
	return (
		<>
			<Head>
				<title>Checkout</title>
				<meta name="description" content="Merlyn Clothing checkout" />
			</Head>

			<CheckoutInner />
		</>
	);
};

export default CheckoutPage;
