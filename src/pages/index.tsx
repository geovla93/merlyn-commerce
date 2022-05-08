import Head from "next/head";

import Directory from "../components/Directory/Directory";

import { connectToDatabase } from "../lib/db/mongodb";

const HomePage = ({ sections }) => {
	return (
		<>
			<Head>
				<title>Homepage</title>
				<meta name="description" content="Merlyn Clothing homepage" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>

			<div className="py-8 space-y-6">
				<h1 className="text-3xl">
					This web application is just a project showcase. It's not intented for
					commercial use!
				</h1>
				<Directory sections={sections} />
			</div>
		</>
	);
};

export const getStaticProps = async () => {
	const { db } = await connectToDatabase();

	const sections = await db.collection("sections").find({}).toArray();

	const data = JSON.parse(JSON.stringify(sections));

	return {
		props: {
			sections: data,
		},
	};
};

export default HomePage;
