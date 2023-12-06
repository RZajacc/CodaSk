import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  const payload = {
    sub: userID,
  };

  const secretOrPrivateKey = process.env.SECRET_KEY;

  const options = {
    expiresIn: "3 days",
  };

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  console.log("token :>> ", token);
  return token;
};

export { generateToken };
