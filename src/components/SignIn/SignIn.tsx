import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/outline";

import CustomButton from "../CustomButton/CustomButton";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { data: session } = useSession();
  const router = useRouter();

  const { email, password } = userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!session) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });

        console.log(result);

        if (!result.error) {
          router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/");
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="mx-auto mt-10 flex w-3/5 flex-col items-center space-y-4">
      <span className="rounded-full bg-black p-4">
        <LockClosedIcon className="h-6 w-6 text-white" />
      </span>
      <h1 className="text-xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
          name="password"
          autoComplete="password"
        />
        <div className="flex flex-1 flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <CustomButton type="submit" style="md:flex-1">
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            inverted
            style="md:flex-1"
            onClick={() => signIn("google")}
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
      <div className="flex w-full flex-col items-start md:flex-row md:justify-between">
        <Link href="/profile/forgot-password">
          <a className="hover:underline">Forgot password?</a>
        </Link>
        <Link href="/auth/signup">
          <a className="hover:underline">Don&apos;t have an account? Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
