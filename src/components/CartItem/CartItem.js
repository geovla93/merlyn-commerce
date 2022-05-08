const CartItem = ({ item }) => {
	const { imageUrl, price, name, quantity } = item;

	return (
		<div className="w-full flex h-24 mb-4">
			<img className="w-20" loading="lazy" src={imageUrl} alt={name} />
			<div className="flex w-full flex-col items-start justify-center px-5 py-3">
				<span className="text-lg">{name}</span>
				<span className="text-lg">
					{quantity} x ${price}
				</span>
			</div>
		</div>
	);
};

export default CartItem;
