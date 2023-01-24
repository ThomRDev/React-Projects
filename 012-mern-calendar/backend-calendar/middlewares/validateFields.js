import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  return next();
};
