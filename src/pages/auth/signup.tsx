import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUp from "../../components/SignUp/SignUp";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Merlyn Clothing Sign Up" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
