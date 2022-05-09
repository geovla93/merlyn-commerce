import { FC } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/solid";

import { CartItem } from "../../types/models";
import useCart from "../../hooks/useCart";

type Props = { item: CartItem };

const CheckoutItem: FC<Props> = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

  const handleRemoveItem = () => removeItemFromCart(item);
  const handleAddItem = () => addItemToCart(item);
  const handleClearItem = () => clearItemFromCart(item);

  return (
    <div className="flex items-center justify-between">
      <div className="flex w-3/12 md:w-4/12">
        <img
          className="h-full w-1/3 bg-contain"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
      <h2 className="w-3/12 text-left md:w-3/12">{name}</h2>
      <div className="flex w-2/12 items-center justify-center space-x-2 md:w-2/12">
        <ChevronLeftIcon
          onClick={handleRemoveItem}
          className="h-5 w-5 cursor-pointer rounded-full hover:bg-gray-200 hover:bg-opacity-60"
        />
        <span>{quantity}</span>
        <ChevronRightIcon
          onClick={handleAddItem}
          className="h-5 w-5 cursor-pointer rounded-full hover:bg-gray-200 hover:bg-opacity-60"
        />
      </div>
      <span className="w-2/12 md:w-2/12">{price}$</span>
      <span className="flex w-2/12 justify-end pr-4 md:w-1/12 md:pr-5">
        <XIcon
          onClick={handleClearItem}
          className="h-5 w-5 cursor-pointer rounded-full hover:bg-gray-200 hover:bg-opacity-60"
        />
      </span>
    </div>
  );
};

export default CheckoutItem;
