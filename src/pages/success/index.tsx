import Head from "next/head";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/solid";

import CustomButton from "../../components/CustomButton/CustomButton";
import { useEffect } from "react";
import useCart from "../../hooks/useCart";

const SuccessPage = () => {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    if (router.query.referrer && router.query.referrer === "stripe") {
      clearCart();
    }
  }, [clearCart, router.query]);

  const handleClick = () => {
    router.replace("/orders");
  };

  return (
    <>
      <Head>
        <title>Success</title>
        <meta name="description" content="Merlyn Clothing success page" />
      </Head>

      <div className="mx-auto flex max-w-screen-lg flex-col items-center bg-white p-10">
        <div className="mb-5 flex items-center space-x-2">
          <CheckCircleIcon className="h-10 text-green-500" />
          <h1 className="text-3xl">
            Thank you, your order has been confirmed!
          </h1>
        </div>
        <p>
          Thank you for shopping with us. We&apos;ll send a confirmation email
          once your items has shipped. If you would like to check the status of
          your order(s) please press the link below.
        </p>
        <CustomButton onClick={handleClick} style="mt-8">
          Go to my orders
        </CustomButton>
      </div>
    </>
  );
};

export default SuccessPage;
