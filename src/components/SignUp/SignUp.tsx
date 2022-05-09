import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/outline";

import CustomButton from "../CustomButton/CustomButton";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const { firstName, lastName, email, password, confirmPassword } =
    userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match!");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) throw new Error(json.message || "Something went wrong");

      console.log(json.message);

      setUserCredentials({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.replace("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <div className="mx-auto mt-10 flex w-3/5 flex-col items-center space-y-4">
      <span className="rounded-full bg-black p-4">
        <LockClosedIcon className="h-6 w-6 text-white" />
      </span>
      <h1 className="text-xl">Sign In</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
          <input
            className="input flex-1"
            type="text"
            placeholder="First Name"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="input flex-1"
            type="text"
            placeholder="Last Name"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <input
          className="input"
          type="email"
          placeholder="Email Address"
          value={email}
          name="email"
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <CustomButton>Sign Up</CustomButton>
      </form>
      <Link href="/auth/signin">
        <a className="self-end hover:underline">
          Already have an account? Sign in
        </a>
      </Link>
    </div>
  );
};

export default SignUp;
