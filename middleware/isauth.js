const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.json({ status: false, message: "Not authenticated." });
  }

  try {
    const decodedToken = jwt.verify(token, "secret");
    if (!decodedToken) {
      return res.json({ status: false, message: "Not authenticated." });
    }

    req.userdata = decodedToken;
  } catch (error) {
    return res.json({ status: false, message: "Token Missing or Expired" });
  }
  next();
};
