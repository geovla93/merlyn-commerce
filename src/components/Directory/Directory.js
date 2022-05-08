import MenuItem from "../MenuItem/MenuItem";

const Directory = ({ sections }) => {
	return (
		<div className="grid lg:grid-cols-6 gap-2">
			{sections.map(({ _id, ...otherProps }) => (
				<MenuItem key={_id} {...otherProps} />
			))}
		</div>
	);
};

export default Directory;
