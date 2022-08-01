/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}
