import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line no-undef
declare var global: NodeJS.Global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
