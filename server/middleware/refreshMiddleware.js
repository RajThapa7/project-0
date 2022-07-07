require("dotenv").config();

const refreshMiddleware = async (req, res, next) => {
  if (!req.cookies?.refreshToken) {
    return res.status(406).json({ message: "Unauthorized" });
  }
  // Destructuring refreshToken from cookie
  const refreshToken = req.cookies.refreshToken;

  // Verifying refresh token
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    const accessToken = jwt.sign(
      {
        name: payload.name,
        userId: payload.userId,
      },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.json({ accessToken });
    next();
  } catch (error) {
    res.json({ error });
  }
};

module.exports = refreshMiddleware;
