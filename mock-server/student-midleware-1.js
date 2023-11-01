module.exports = function (req, res, next) {
  if (req.method === 'POST' && req.url === '/login') {
    const { email, password } = req.body;

    if (email === 'test@gmail.com' && password === 'testpassword') {
      // If credentials are valid, backend throws back usertype and studenttoken.
      res.status(200).json({
        userToken: 'studenttoken123',
        userType: 'S',
      });
    } else {
      // When creds are invalid
      res.status(401).json({
        error: 'Invalid credentials',
      });
    }
  }
  else {
    // If request is not a POST to /login, pass to the next middleware/handler
    next();
  }
};