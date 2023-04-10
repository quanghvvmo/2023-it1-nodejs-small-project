const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("catch")
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;