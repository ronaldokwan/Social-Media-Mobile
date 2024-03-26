import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret);
}
function verifyToken(token) {
  return jwt.verify(token, secret);
}
export { signToken, verifyToken };
