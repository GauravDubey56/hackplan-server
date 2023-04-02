module.exports = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json({
        validation: error.details,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};
