import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LockClosedIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import Button from '@/components/ui/Button';

const SignUp: FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const { firstName, lastName, email, password, confirmPassword } =
    userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password don't match!");
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();

      if (!response.ok) throw new Error(json.message || 'Something went wrong');

      setUserCredentials({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      router.replace('/auth/signin');
    } catch (error) {
      toast.error(error.message);
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
    <div className="mx-auto my-10 flex w-full max-w-lg flex-col items-center space-y-4">
      <span className="rounded-full bg-indigo-600 p-4">
        <LockClosedIcon className="h-6 w-6 text-white" />
      </span>
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <form className="flex w-full flex-col space-y-6" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-y-6 md:flex-row md:gap-x-6">
          <input
            className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600 md:w-full"
            type="text"
            placeholder="First Name"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600 md:w-full"
            type="text"
            placeholder="Last Name"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <input
          className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600"
          type="email"
          placeholder="Email Address"
          value={email}
          name="email"
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600"
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
        <input
          className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <Button>Sign Up</Button>
      </form>
      <Link
        href="/auth/signin"
        className="self-end text-indigo-600 hover:underline"
      >
        Already have an account? Sign in
      </Link>
    </div>
  );
};

export default SignUp;
