import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

const NavList = ({ styles }) => {
	const [session, isLoading] = useSession();
	const router = useRouter();

	const handleSignOut = async (event) => {
		event.preventDefault();

		const data = await signOut({ redirect: false, callbackUrl: "/auth" });

		if (data) {
			router.push("/auth/signin");
		}
	};
	return (
		<ul
			className={`${styles} mt-10 md:mt-0 md:flex-row md:space-x-6 items-center w-full md:w-96`}
		>
			<li className="p-2 w-full md:flex md:justify-center hover:bg-gray-300 hover:bg-opacity-60 transition-colors duration-300 cursor-pointer">
				<Link href="/shop">
					<a className="nav-link">SHOP</a>
				</Link>
			</li>
			<li className="p-2 w-full md:flex md:justify-center hover:bg-gray-300 hover:bg-opacity-60 transition-colors duration-300 cursor-pointer">
				<Link href="/contact">
					<a className="nav-link">CONTACT</a>
				</Link>
			</li>
			<li className="p-2 w-full md:flex md:justify-center hover:bg-gray-300 hover:bg-opacity-60 transition-colors duration-300 cursor-pointer">
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
