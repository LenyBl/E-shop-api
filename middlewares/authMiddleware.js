const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const AppError = require('../utils/AppError');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError("Accès non autorisé", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("Utilisateur inexistant", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Token invalide ou expiré", 401));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Accès refusé", 403));
    }
    next();
  };
};
