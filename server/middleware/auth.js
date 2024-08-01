import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const user = jwt.verify(authToken, process.env.JWT_SECRET);

    req.id = user.id;

    next();
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
      msg: "UnAuthorized Error",
    });
  }
};
