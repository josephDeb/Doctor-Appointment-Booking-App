import jwt from "jsonwebtoken";


const jwtpass = "naniwanandeska" || process.env.JWT_SECRET

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, jwtpass, {
      expiresIn: "30d",
    });
  
    // Set JWT as an HTTP-Only Cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateToken
  