import { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";

import Directory from "../components/Directory/Directory";

import { connectToDatabase } from "../lib/db/mongodb";
import { Section } from "../types/models";

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  sections,
}) => {
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

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();

  const sections = await db.collection("sections").find({}).toArray();

  const data = JSON.parse(JSON.stringify(sections)) as Section[];

  return {
    props: {
      sections: data,
    },
  };
};

export default HomePage;
