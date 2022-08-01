import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Section } from '@prisma/client';

import Directory from '@/components/common/Directory';
import prisma from '@/lib/prisma';

type Props = {
  sections: Section[];
};

const HomePage: NextPage<Props> = ({ sections }) => {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Merlyn Clothing homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="space-y-6 py-8">
        <h1 className="text-3xl">
          This web application is just a project showcase. It&apos;s not
          intented for commercial use!
        </h1>
        <Directory sections={sections} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sections = await prisma.section.findMany();

  return {
    props: {
      sections: JSON.parse(JSON.stringify(sections)),
    },
  };
};

export default HomePage;
