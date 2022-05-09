import Head from "next/head";
import CollectionsOverview from "../../components/CollectionsOverview/CollectionsOverview";

import { connectToDatabase } from "../../lib/db/mongodb";

const ShopPage = ({ collections }) => {
	return (
		<>
			<Head>
				<title>Shop</title>
				<meta name="description" content="Merlyn Clothing shop" />
			</Head>

			<CollectionsOverview collections={collections} />
		</>
	);
};

export const getStaticProps = async () => {
	const { db } = await connectToDatabase();

	const hats = await db
		.collection("items")
		.find({ category: "Hats" })
		.limit(4)
		.toArray();
	const sneakers = await db
		.collection("items")
		.find({ category: "Sneakers" })
		.limit(4)
		.toArray();
	const jackets = await db
		.collection("items")
		.find({ category: "Jackets" })
		.limit(4)
		.toArray();
	const womens = await db
		.collection("items")
		.find({ gender: "Womens" })
		.limit(4)
		.toArray();
	const mens = await db
		.collection("items")
		.find({ gender: "Mens" })
		.limit(4)
		.toArray();

	const collections = {
		hats: JSON.parse(JSON.stringify(hats)),
		sneakers: JSON.parse(JSON.stringify(sneakers)),
		jackets: JSON.parse(JSON.stringify(jackets)),
		womens: JSON.parse(JSON.stringify(womens)),
		mens: JSON.parse(JSON.stringify(mens)),
	};

	return {
		props: {
			collections,
		},
	};
};

export default ShopPage;
