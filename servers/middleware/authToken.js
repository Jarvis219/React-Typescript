// import jwt from "jsonwebtoken";
export const authToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  console.log(token);
  next();
  //   if (!token) {
  //     return res.status(401).json({
  //       error: "token not match",
  //     });
  //   }
  //   jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
  //     if (err) {
  //       return res.status(403).json({
  //         err,
  //         error: "token expired",
  //       });
  //     }
  //     next();
  //   });
};
