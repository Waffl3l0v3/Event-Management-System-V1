import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {

  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
    // { expiresIn: "30s" }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
    // { expiresIn: "2m" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
    // maxAge: 30 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
    // maxAge: 2 * 60 * 1000
  });

  return accessToken;
};