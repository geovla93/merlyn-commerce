import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Product } from '@prisma/client';

import ItemPreview from '@/features/product/components/ItemPreview';
import prisma from '@/lib/prisma';

type Props = {
  item: Product;
};

const ItemPage: NextPage<Props> = ({ item }) => {
  return (
    <>
      <Head>
        <title>Collection Item</title>
        <meta name="description" content="Merlyn Clothing collection item" />
      </Head>

      <ItemPreview item={item} />
    </>
  );
};

export const getStaticPaths = async () => {
  const products = await prisma.product.findMany({ select: { slug: true } });

  const paths = products.map((item) => {
    return {
      params: {
        itemId: item.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const itemId = params.itemId as string;

  try {
    const item = await prisma.product.findUnique({ where: { slug: itemId } });
    return {
      props: {
        item: JSON.parse(JSON.stringify(item)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ItemPage;
