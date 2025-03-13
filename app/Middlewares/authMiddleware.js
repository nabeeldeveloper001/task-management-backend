const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req || !res) {
    console.error("Middleware Error: req or res is undefined");
    return;
  }

  if (!req.headers || !req.headers.authorization) {
    console.log("Unauthorized request - No Authorization header found");
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("Unauthorized request - Token missing");
    return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    return res.status(403).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
