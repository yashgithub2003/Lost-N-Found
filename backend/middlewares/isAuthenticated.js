import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ FIX HERE
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default isAuthenticated;