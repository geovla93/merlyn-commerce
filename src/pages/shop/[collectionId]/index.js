import Head from "next/head";

import { connectToDatabase } from "../../../lib/db/mongodb";

import Collection from "../../../components/Collection/Collection";

const CollectionPage = ({ collection }) => {
	console.log(collection);
	return (
		<>
			<Head>
				<title>Collection</title>
				<meta name="description" content="Merlyn Clothing collection" />
			</Head>

			<Collection items={collection} />
		</>
	);
};

export const getStaticPaths = async () => {
	const { db } = await connectToDatabase();

	const collections = await db.collection("items").find({}).toArray();

	const paths = collections.map((collection) => {
		return {
			params: { collectionId: collection.category.toLowerCase() },
		};
	});

	return {
		paths: paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params }) => {
	const collectionId = params.collectionId;

	const { db } = await connectToDatabase();

	const capitalize = (string) => {
		return string[0].toUpperCase() + string.slice(1);
	};

	const id = capitalize(collectionId);

	let collection;

	if (collectionId === "mens" || collectionId === "womens") {
		collection = await db.collection("items").find({ gender: id }).toArray();
	} else {
		collection = await db.collection("items").find({ category: id }).toArray();
	}

	if (!collection) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			collection: JSON.parse(JSON.stringify(collection)),
		},
	};
};

export default CollectionPage;
