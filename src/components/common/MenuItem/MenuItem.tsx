import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  title: string;
  image: string;
  size: string | undefined;
  slug: string;
};

const MenuItem: FC<Props> = ({ title, image, size, slug }) => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push(slug);
  };

  return (
    <div
      className={`${
        size ? 'lg:col-span-3' : 'lg:col-span-2'
      } group relative cursor-pointer overflow-hidden`}
      onClick={handleMenuClick}
    >
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="h-full w-full transition duration-3000 group-hover:scale-110 group-hover:transform"
      />
      <div className="absolute top-1/2 left-1/2 flex h-24 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center border bg-white px-6 opacity-70 group-hover:opacity-90">
        <h2 className="text-2xl">{title.toUpperCase()}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default MenuItem;
