import Head from "next/head";
import { ObjectID } from "mongodb";

import { connectToDatabase } from "../../../../lib/db/mongodb";

import ItemPreview from "../../../../components/ItemPreview/ItemPreview";

const ItemPage = ({ item }) => {
	return (
		<>
			<Head>
				<title>Collection Item</title>
				<meta name="description" content="Merlyn Clothing collection item" />
			</Head>

			<ItemPreview item={item} />
		</>
	);
};

export const getStaticPaths = async () => {
	const { db } = await connectToDatabase();

	const items = await db.collection("items").find({}).toArray();

	const paths = items.map((item) => {
		return {
			params: {
				collectionId: item.category.toLowerCase(),
				itemId: item._id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params }) => {
	const { collectionId, itemId } = params;

	console.log(collectionId);
	console.log(itemId);

	const { db } = await connectToDatabase();

	const item = await db.collection("items").findOne({ _id: ObjectID(itemId) });

	if (!item) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			item: JSON.parse(JSON.stringify(item)),
		},
	};
};

export default ItemPage;
