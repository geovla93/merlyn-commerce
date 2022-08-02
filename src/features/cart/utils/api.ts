import prisma from '@/lib/prisma';

export const getAllOrders = async (customerId: string) => {
  const orders = await prisma.order.findMany({ where: { userId: customerId } });
  return orders;
};
