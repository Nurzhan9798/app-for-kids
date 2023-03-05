import jwt from "jsonwebtoken";

const jwtSecretKey = "somesecretkey";

class AuthMiddleware {
  checkToken(req, res, next) {
    try {
      console.log("check token");
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      if (!token) {
        console.log("has not toekn", !token);
        return res.status(401).json({ message: "Has not auth token" });
      }

      const decoded = jwt.verify(token, jwtSecretKey);
      console.log("decoded");
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}

export default new AuthMiddleware();
