exports.isUserAuth = function (req, res, next) {
  var auth = req.isAuthenticated();
  if (auth) {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: "Unauthorized User",
    });
  }
};
