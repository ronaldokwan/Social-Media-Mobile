import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

export const comparePassword = (password, hashedPassword) => {
  const comparedPassword = bcrypt.compareSync(password, hashedPassword);
  return comparedPassword;
};
