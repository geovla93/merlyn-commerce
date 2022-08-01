import { FC } from 'react';
import { useRouter } from 'next/router';

import CollectionItem from '../CollectionItem';
import { Product } from '@prisma/client';
import List from '@/components/ui/List';

type Props = {
  items: Product[];
};

const Collection: FC<Props> = ({ items }) => {
  const router = useRouter();
  const title = router.query.collection;

  return (
    <div className="my-16 flex flex-col space-y-6">
      <h1 className="text-left text-2xl uppercase">{title}</h1>
      <List
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <CollectionItem item={item} />}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      />
    </div>
  );
};

export default Collection;
