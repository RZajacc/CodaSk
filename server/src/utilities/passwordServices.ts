import bcrypt from "bcrypt";

const hashPassword = async (userPassword: string) => {
  try {
    console.log("userPassword :>> ", userPassword);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(userPassword, salt);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const verifyPassword = async (userPassword:string, hashedPassword:string) => {
  try {
    return await bcrypt.compare(userPassword, hashedPassword);
  } catch (error) {
    console.log("error checking user password:>> ", error);
  }
};

export { hashPassword, verifyPassword };
