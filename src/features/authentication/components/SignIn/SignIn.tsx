import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { LockClosedIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

import Button from '@/components/ui/Button';

const SignIn: FC = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const { email, password } = userCredentials;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn<'credentials'>('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result.error) {
        router.replace('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="mx-auto mt-10 flex w-3/5 flex-col items-center space-y-4">
      <span className="rounded-full bg-indigo-600 p-4">
        <LockClosedIcon className="h-6 w-6 text-white" />
      </span>
      <h1 className="text-2xl font-medium">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col space-y-6"
      >
        <input
          className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600"
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
        />
        <input
          className="rounded border border-gray-300 p-4 outline-none transition-colors hover:border-indigo-600 focus:border-indigo-600"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleChange}
          name="password"
          autoComplete="password"
        />
        <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6">
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          <Button
            className="w-full"
            type="button"
            inverted
            onClick={() => signIn('google')}
          >
            Sign In with Google
          </Button>
        </div>
      </form>
      <div className="mx-auto flex w-full max-w-md flex-col items-start md:flex-row md:justify-between">
        <small className="text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </small>
        <small className="text-sm">
          <Link
            href="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </small>
      </div>
    </div>
  );
};

export default SignIn;
