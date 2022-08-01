import { FC } from 'react';

import type { CartItem as ICartItem } from '@/types/models';

type Props = { item: ICartItem };

const CartItem: FC<Props> = ({ item }) => {
  const { image, price, name, quantity } = item;

  return (
    <div className="mb-4 flex h-24 w-full">
      <img className="w-20" loading="lazy" src={image} alt={name} />
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
