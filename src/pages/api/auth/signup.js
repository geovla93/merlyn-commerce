import { hashPassword } from "../../../lib/auth/auth";
import { connectToDatabase } from "../../../lib/db/mongodb";

export default async (req, res) => {
	if (req.method === "POST") {
		const { firstName, lastName, email, password } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!password ||
			!password.trim().length > 7
		) {
			res.status(422).json({ message: "Invalid input!" });
			return;
		}

		const { db } = await connectToDatabase();

		const existingUser = await db.collection("users").findOne({ email: email });

		if (existingUser) {
			res.status(422).json({ message: "User is already registered." });
			return;
		}

		const hashedPassword = await hashPassword(password);

		const result = await db.collection("users").insertOne({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
		});

		res.status(201).json({ message: "Created user!" });
	}
};
