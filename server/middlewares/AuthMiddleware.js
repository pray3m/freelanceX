import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = JSON.parse(req.cookies.jwt);
  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token.jwt, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).send("Invalid token");
    // console.log(payload);
    req.userId = payload?.userId;
    next();
  });
};
