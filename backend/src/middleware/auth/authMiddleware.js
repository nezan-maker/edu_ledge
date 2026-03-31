import jwt from "jsonwebtoken";
import debug from "debug";
const authDebug = debug("app:auth");
export const authMiddleWare = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    authDebug("User not logged in ");
    return res.status(401).json({ error: "User not signed in" });
  }
  const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
  if (payload) {
    req.userData = payload;
    next();
  }
};
