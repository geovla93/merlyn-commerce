import Link from "next/link";

import CollectionItem from "../CollectionItem/CollectionItem";

const CollectionPreview = ({ title, items }) => {
	return (
		<div className="flex flex-col space-y-2">
			<span className="text-left text-2xl font-bold">
				<Link href={`/shop/${title}`}>
					<a>{title.toUpperCase()}</a>
				</Link>
			</span>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
				{items.map((item) => (
					<CollectionItem key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default CollectionPreview;
