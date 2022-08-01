import { hash, verify } from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return verify(hashedPassword, password);
};
