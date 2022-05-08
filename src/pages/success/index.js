import Head from "next/head";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/solid";

import CustomButton from "../../components/CustomButton/CustomButton";

import { wrapper } from "../../store/store";
import {} from "../../store/cartSlice";

const SuccessPage = () => {
	const router = useRouter();

	const handleClick = () => {
		router.replace("/orders");
	};

	return (
		<>
			<Head>
				<title>Success</title>
				<meta name="description" content="Merlyn Clothing success page" />
			</Head>

			<div className="flex flex-col items-center p-10 bg-white max-w-screen-lg mx-auto">
				<div className="flex items-center space-x-2 mb-5">
					<CheckCircleIcon className="text-green-500 h-10" />
					<h1 className="text-3xl">
						Thank you, your order has been confirmed!
					</h1>
				</div>
				<p>
					Thank you for shopping with us. We'll send a confirmation email once
					your items has shipped. If you would like to check the status of your
					order(s) please press the link below.
				</p>
				<CustomButton onClick={handleClick} styles="mt-8">
					Go to my orders
				</CustomButton>
			</div>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		console.log("2. Page.getServerSideProps uses the store to dispatch things");
		await store.__persistor.purge();
	}
);

export default SuccessPage;
