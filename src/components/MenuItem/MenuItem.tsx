import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  title: string;
  imageUrl: string;
  size: string | undefined;
  linkUrl: string;
};

const MenuItem: FC<Props> = ({ title, imageUrl, size, linkUrl }) => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push(`${linkUrl}`);
  };

  return (
    <div
      className={`${
        size ? "lg:col-span-3" : "lg:col-span-2"
      } group relative cursor-pointer overflow-hidden`}
      onClick={handleMenuClick}
    >
      <img
        loading="lazy"
        src={imageUrl}
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
