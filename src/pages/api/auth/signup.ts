import { NextApiRequest, NextApiResponse } from "next";
import isEmail from "validator/lib/isEmail";

import { hashPassword } from "../../../lib/auth/auth";
import { connectToDatabase } from "../../../lib/db/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body;

    if (!isEmail(email) || password.trim().length < 7) {
      return res.status(422).json({ message: "Invalid input!" });
    }

    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User is already registered." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    };
    const result = await db.collection("users").insertOne(newUser);

    res
      .status(201)
      .json({
        message: "Created user!",
        data: { ...newUser, _id: result.insertedId.toString() },
      });
  }
};

export default handler;
