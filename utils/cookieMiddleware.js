module.exports = (req, res, next) => {
  if (Object.keys(req.cookies).length) {
    next();
  } else {
    const error = new Error("No Cookies");
    error.statusCode = 400;
    throw error;
  }
};
