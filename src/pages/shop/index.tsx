import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import CollectionsOverview from '@/features/product/components/CollectionsOverview';
import Collection from '@/features/product/components/Collection';
import {
  getLimitedProducts,
  getProductsByCategory,
} from '@/features/product/utils/api';
import { Product } from '@prisma/client';

type Collections = 'hats' | 'sneakers' | 'jackets' | 'women' | 'men';
type CollectionsProps = {
  collections: Record<Collections, Product[]>;
  collection: undefined;
};
type CollectionProps = {
  collections: undefined;
  collection: Product[];
};

type Props = CollectionProps | CollectionsProps;

const ShopPage: NextPage<Props> = ({ collections, collection }) => {
  if (!collection && !collections) {
    return null;
  }

  if (collection) {
    return (
      <>
        <Head>
          <title>Collection</title>
          <meta name="description" content="Merlyn Clothing collection" />
        </Head>

        <Collection items={collection} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Merlyn Clothing shop" />
      </Head>

      <CollectionsOverview collections={collections} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;

  const isEmpty = (obj: Record<string, any>): boolean =>
    Object.keys(obj).length === 0;

  if (isEmpty(query)) {
    const { hats, jackets, men, sneakers, women } = await getLimitedProducts();

    const collections = {
      hats: JSON.parse(JSON.stringify(hats)),
      sneakers: JSON.parse(JSON.stringify(sneakers)),
      jackets: JSON.parse(JSON.stringify(jackets)),
      women: JSON.parse(JSON.stringify(women)),
      men: JSON.parse(JSON.stringify(men)),
    };

    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59',
    );

    return {
      props: {
        collections,
      },
    };
  } else {
    const collectionName = query.collection as string;

    const capitalize = (str: string) => {
      return str[0].toUpperCase() + str.slice(1);
    };

    const category = capitalize(collectionName);
    const collection = await getProductsByCategory(category);

    if (collection.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        collection: JSON.parse(JSON.stringify(collection)),
      },
    };
  }
};

export default ShopPage;
