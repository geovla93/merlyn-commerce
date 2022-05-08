import { useRouter } from "next/router";

import CollectionItem from "../CollectionItem/CollectionItem";

const Collection = ({ items }) => {
	const router = useRouter();
	const title = router.query.collectionId;

	return (
		<div className="flex flex-col space-y-6 my-16">
			<h1 className="uppercase text-2xl">{title}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
				{items.map((item) => (
					<CollectionItem key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default Collection;
