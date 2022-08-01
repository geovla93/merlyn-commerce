import { FC } from 'react';
import Image from 'next/image';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/solid';

import { CartItem } from '@/types/models';
import useCart from '@/features/cart/hooks/useCart';

type Props = { item: CartItem };

const CheckoutItem: FC<Props> = ({ item }) => {
  const { name, image, price, quantity } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

  const handleRemoveItem = () => removeItemFromCart(item);
  const handleAddItem = () => addItemToCart(item);
  const handleClearItem = () => clearItemFromCart(item);

  return (
    <div className="flex justify-between gap-x-3 py-6 first:pt-0 last:pb-0">
      <div className="relative aspect-[3/4] h-auto w-36 rounded">
        <Image
          src={image}
          alt={name}
          className="rounded"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col items-start">
        <h4 className="font-medium">{name}</h4>
        <p className="text-lg font-medium">${price.toFixed(2)}</p>
      </div>
      <div className="flex flex-grow items-center justify-center self-start">
        <ChevronLeftIcon
          className="h-5 w-5 cursor-pointer"
          onClick={handleRemoveItem}
        />
        {quantity}
        <ChevronRightIcon
          className="h-5 w-5 cursor-pointer"
          onClick={handleAddItem}
        />
      </div>
      <div
        className="cursor-pointer self-start rounded-full p-2 transition-colors hover:bg-white"
        onClick={handleClearItem}
      >
        <XIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default CheckoutItem;
