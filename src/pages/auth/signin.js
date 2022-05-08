import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import SignIn from "../../components/SignIn/SignIn";

const SignInPage = () => {
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
				<title>Sign In</title>
				<meta name="description" content="Merlyn Clothing Sign In" />
			</Head>

			<SignIn />
		</>
	);
};

export default SignInPage;
