import CollectionPreview from "../CollectionPreview/CollectionPreview";

const convertCollections = (collections) => {
	return Object.keys(collections).map((key) => {
		return {
			id: key,
			title: key,
			items: collections[key],
		};
	});
};

const CollectionsOverview = ({ collections }) => {
	const convertedCollections = convertCollections(collections);

	return (
		<div className="flex flex-col space-y-4 my-16">
			{convertedCollections.map(({ id, ...otherProps }) => (
				<CollectionPreview key={id} {...otherProps} />
			))}
		</div>
	);
};

export default CollectionsOverview;
