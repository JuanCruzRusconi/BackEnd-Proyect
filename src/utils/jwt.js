import jwt from "jsonwebtoken";

export const SECRET = "34wrtw3342teawsdasD2QEFWF234";

// const token = jwt.sign(
//   { id: "id", email: "hola@mundo.com", name: "coder house" },
//   SECRET,
//   { expiresIn: "1h" }
// );
// console.log(token);
// const invalid =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkIiwiZW1haWwiOiJob2xhQG11bmRvLmNvbSIsIm5hbWUiOiJjb2RlaG91c2UiLCJpYXQiOjE2OTI3NDc3NTYsImV4cCI6MTY5Mjc1MTM1Nn0.e5L2xxSKAAVxsWoGEMFFKBZ6Wcyb7U-2GYm2cBxFki4";
// try {
//   const verify = jwt.verify(invalid, SECRET);
//   console.log(verify);
// } catch (e) {
//   console.error(e);
// }

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
  if (!token) return res.send({ error: true });
  try {
    const valid = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    return res.send({ error: true });
  }
};