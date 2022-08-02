import { FC } from 'react';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { StarIcon } from '@heroicons/react/solid';

import Button from '@/components/ui/Button';
import useCart from '@/features/cart/hooks/useCart';

type Props = {
  item: Product;
};

const ItemPreview: FC<Props> = ({ item }) => {
  const { id, name, image, price, slug } = item;
  const { addItemToCart } = useCart();

  const handleAddItem = () =>
    addItemToCart({ id, name, image, price, slug, quantity: 1 });

  return (
    <div className="my-16 grid gap-6 text-left lg:grid-cols-2">
      <div className="relative aspect-[3/4] h-auto w-full rounded-lg">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">{name}</h1>
        <h4 className="text-xl">${price}</h4>
        <div className="flex items-center pb-3">
          <StarIcon className="h-5 w-5 text-indigo-600" />
          <StarIcon className="h-5 w-5 text-indigo-600" />
          <StarIcon className="h-5 w-5 text-indigo-600" />
          <StarIcon className="h-5 w-5 text-indigo-600" />
          <StarIcon className="h-5 w-5 text-gray-400" />
          <p className="ml-3">117 reviews</p>
        </div>
        <Button onClick={handleAddItem}>Add to bag</Button>
        <p className="pt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default ItemPreview;
