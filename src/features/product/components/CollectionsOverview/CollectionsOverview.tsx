import { FC } from 'react';
import { Product } from '@prisma/client';

import CollectionPreview from '../CollectionPreview';
import List from '@/components/ui/List';

const convertCollections = (
  collections: Record<Collections, Product[]>,
): { id: string; title: string; items: Product[] }[] => {
  return Object.keys(collections).map((key) => {
    return {
      id: key,
      title: key,
      items: collections[key],
    };
  });
};

type Collections = 'hats' | 'sneakers' | 'jackets' | 'women' | 'men';
type Props = {
  collections: Record<Collections, Product[]>;
};

const CollectionsOverview: FC<Props> = ({ collections }) => {
  const convertedCollections = convertCollections(collections);

  return (
    <List
      data={convertedCollections}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <CollectionPreview title={item.title} items={item.items} />
      )}
      className="my-16 flex flex-col space-y-4"
    />
  );
};

export default CollectionsOverview;
