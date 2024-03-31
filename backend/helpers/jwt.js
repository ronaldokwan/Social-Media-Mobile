import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret);
}
function verifyToken(token) {
  return jwt.verify(token, secret);
}
export { signToken, verifyToken };
