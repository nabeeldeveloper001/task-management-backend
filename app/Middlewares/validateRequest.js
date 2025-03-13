const { ZodError } = require("zod");

const validateRequest = (schema, type = "body") => (req, res, next) => {
  try {
    if (type === "body") schema.parse(req.body);
    if (type === "params") schema.parse(req.params);
    if (type === "query") schema.parse(req.query);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed errors",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

module.exports = validateRequest;
