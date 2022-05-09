import { FC } from "react";
import Link from "next/link";

import CollectionItem from "../CollectionItem/CollectionItem";
import type { Product } from "../../types/models";

type Props = {
  title: string;
  items: Product[];
};

const CollectionPreview: FC<Props> = ({ title, items }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-left text-2xl font-bold">
        <Link href={`/shop/${title}`}>
          <a>{title.toUpperCase()}</a>
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <CollectionItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
