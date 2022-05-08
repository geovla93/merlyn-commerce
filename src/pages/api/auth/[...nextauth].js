import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { connectToDatabase } from "../../../lib/db/mongodb";
import { verifyPassword } from "../../../lib/auth/auth";

const options = {
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				try {
					const { db } = await connectToDatabase();
					const user = await db.collection("users").findOne({
						email: credentials.email,
					});

					if (!user) throw new Error("No user found");

					const isPasswordValid = await verifyPassword(
						credentials.password,
						user.password
					);

					if (!isPasswordValid) throw new Error("Password is not valid");

					return {
						email: user.email,
					};
				} catch (error) {
					throw new Error(error);
				}
			},
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
	debug: true,
};

export default (req, res) => NextAuth(req, res, options);
