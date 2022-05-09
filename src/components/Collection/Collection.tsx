import { useRouter } from "next/router";
import { FC } from "react";

import CollectionItem from "../CollectionItem/CollectionItem";
import type { Product } from "../../types/models";

type Props = {
  items: Product[];
};

const Collection: FC<Props> = ({ items }) => {
  const router = useRouter();
  const title = router.query.collectionId;

  return (
    <div className="my-16 flex flex-col space-y-6">
      <h1 className="text-2xl uppercase">{title}</h1>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <CollectionItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
