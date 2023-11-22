import jwt from "jsonwebtoken";

export const SECRET = "34wrtw3342teawsdasD2QEFWF234";

export const generateToken = (object) =>
  jwt.sign(object, SECRET, { expiresIn: "1hr" });

export const JWTMW = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send({ msg: "Sin autorizacion" });

  // Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user.user;
    next();
  } catch (e) {
    return res.status(403).send({ msg: "Sin autorizacion" });
  }
};

export const JWTCookieMW = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.send({ error: true, msg: e.message });
  try {
    const valid = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    return res.send({ error: true, msg: e.message });
  }
};