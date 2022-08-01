import { FC } from 'react';
import Link from 'next/link';
import { Product } from '@prisma/client';

import CollectionItem from '../CollectionItem';
import List from '@/components/ui/List';

type Props = {
  title: string;
  items: Product[];
};

const CollectionPreview: FC<Props> = ({ title, items }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-left text-2xl font-bold">
        <Link href={`/shop?collection=${title}`}>{title.toUpperCase()}</Link>
      </span>
      <List
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <CollectionItem item={item} />}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      />
    </div>
  );
};

export default CollectionPreview;
