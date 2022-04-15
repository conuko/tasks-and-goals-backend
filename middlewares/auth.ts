const jwt = require("../utils/jwt");
const createError = require("http-errors");
const auth = async (
  req: { headers: { authorization: string }; user: any },
  res: any,
  next: (arg0: undefined) => void
) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized("Access token is required"));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  await jwt
    .verifyAccessToken(token)
    .then((user: any) => {
      req.user = user;
      next(undefined);
    })
    .catch((e: { message: any }) => {
      next(createError.Unauthorized(e.message));
    });
};
module.exports = auth;
