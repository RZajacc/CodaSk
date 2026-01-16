import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

const generateToken = (userID:string) => {
  const payload:JwtPayload = {
    sub: userID,
  };

  const secretOrPrivateKey: Secret = process.env.SECRET_KEY!;

  const options:SignOptions = {
    expiresIn: "3 days",
  };

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  console.log("token :>> ", token);
  return token;
};

export { generateToken };
