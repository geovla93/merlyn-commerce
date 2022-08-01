/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    HOST: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
