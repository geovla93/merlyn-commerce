import { hash, genSalt, compare } from "bcryptjs";

export const hashPassword = async (password) => {
	const salt = await genSalt(12);

	if (!salt) return;

	const hashedPassword = await hash(password, salt);

	return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
	try {
		const isValid = await compare(password, hashedPassword);
		return isValid;
	} catch (error) {
		throw new Error(error);
	}
};
