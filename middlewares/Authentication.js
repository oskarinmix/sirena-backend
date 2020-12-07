const isUserAuth = function (req, res, next) {
  if (req.isAuthenticated() && req.user) {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: "Unauthorized User",
    });
  }
};

module.exports = isUserAuth;
