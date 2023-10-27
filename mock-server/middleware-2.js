module.exports = function (req, res, next) {
  if (req.url === "/login" && req.body.email === "error") { // mock an error response
    res.status(500).json([
      {
        errors: ["email should have email format"],
        field: "email",
      },
    ]);
  }
  next();
};
