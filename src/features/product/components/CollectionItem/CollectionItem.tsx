import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Product } from '@prisma/client';

type Props = {
  item: Product;
};

const CollectionItem: FC<Props> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRedirect = () => {
    router.push(`/shop/${item.slug}`);
  };

  return (
    <div
      className={`relative flex h-96 w-full flex-col items-center border p-4 ${
        isHovered ? 'shadow-md' : 'shadow-none'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          backgroundImage: `url(${item.image})`,
        }}
        className="h-full w-full cursor-pointer bg-cover bg-center bg-no-repeat hover:opacity-80"
        onClick={handleRedirect}
      />
      <div className="mt-4 flex w-full flex-col justify-between">
        <span className="text-left">
          <Link
            href={`/shop/${item.slug}`}
            className="py-1 text-left hover:underline"
          >
            {item.name}
          </Link>
        </span>
        <span className="text-left">{item.price}$</span>
      </div>
    </div>
  );
};

export default CollectionItem;
