import prisma from '@/lib/prisma';

export const getLimitedProducts = async () => {
  const [hats, jackets, sneakers, women, men] = await Promise.allSettled([
    prisma.product.findMany({ where: { category: 'Hats' }, take: 4 }),
    prisma.product.findMany({
      where: { category: 'Jackets' },
      take: 4,
    }),
    prisma.product.findMany({
      where: { category: 'Sneakers' },
      take: 4,
    }),
    prisma.product.findMany({ where: { gender: 'Women' }, take: 4 }),
    prisma.product.findMany({ where: { gender: 'Men' }, take: 4 }),
  ]);
  if (
    hats.status === 'rejected' ||
    jackets.status === 'rejected' ||
    sneakers.status === 'rejected' ||
    women.status === 'rejected' ||
    men.status === 'rejected'
  ) {
    throw new Error('Error fetching collections');
  }

  return {
    hats: hats.value,
    jackets: jackets.value,
    sneakers: sneakers.value,
    men: men.value,
    women: women.value,
  };
};

export const getProductsByCategory = async (category: string) => {
  if (category === 'Men' || category === 'Women') {
    return prisma.product.findMany({ where: { gender: category } });
  }
  return prisma.product.findMany({ where: { category } });
};

export const getProductBySlug = async (slug: string) => {
  const item = await prisma.product.findUnique({ where: { slug } });
  return item;
};
