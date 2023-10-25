module.exports = function (req, res, next) {
  console.log(req.url);
  if (req.url === "/login" && req.body.email === "error") {
    res.status(500).json([
      {
        errors: ["email should have email format"],
        field: "email",
      },
    ]);
  }
  next();
};
