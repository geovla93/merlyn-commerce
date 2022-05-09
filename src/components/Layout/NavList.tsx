import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

type Props = {
  style: string;
};

const NavList: FC<Props> = ({ style }) => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });

    if (data) {
      router.push("/auth/signin");
    }
  };

  return (
    <ul
      className={`mt-10 w-full items-center md:mt-0 md:w-96 md:flex-row md:space-x-6 ${style}`}
    >
      <li className="w-full cursor-pointer p-2 transition-colors duration-300 hover:bg-gray-300 hover:bg-opacity-60 md:flex md:justify-center">
        <Link href="/shop">
          <a className="nav-link">SHOP</a>
        </Link>
      </li>
      <li className="w-full cursor-pointer p-2 transition-colors duration-300 hover:bg-gray-300 hover:bg-opacity-60 md:flex md:justify-center">
        <Link href="/contact">
          <a className="nav-link">CONTACT</a>
        </Link>
      </li>
      <li className="w-full cursor-pointer p-2 transition-colors duration-300 hover:bg-gray-300 hover:bg-opacity-60 md:flex md:justify-center">
        {session && !isLoading ? (
          <a className="nav-link cursor-pointer" onClick={handleSignOut}>
            SIGN OUT
          </a>
        ) : (
          <Link href="/auth/signin">
            <a className="nav-link">SIGN IN</a>
          </Link>
        )}
      </li>
    </ul>
  );
};

export default NavList;
