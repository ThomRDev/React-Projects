import Joi from "joi";
import { parseErrors } from "../helpers/parseErrors.js";
import {
  validationConfiguration,
  emailDTOSchema,
  nameDTOSchema,
  passwordDTOSchema,
} from "./dto-types.js";

const REGISTER_DTO = Joi.object({
  name: nameDTOSchema,
  password: passwordDTOSchema,
  email: emailDTOSchema,
});

const LOGIN_DTO = Joi.object({
  password: passwordDTOSchema,
  email: emailDTOSchema,
});

export const authRegisterDTO = (req, res, next) => {
  const { error, value } = REGISTER_DTO.validate(
    req.body,
    validationConfiguration("email", "password", "name")
  );

  // cada error tiene una variable
  // https://joi.dev/api/?v=17.6.0#objectunknown

  if (!error) return next();

  return res.status(401).json({
    ok: false,
    ...parseErrors(error.details),
  });

  // si no se que tipo es puedo verlo
  // return res.json({
  //   value,
  //   error,
  // });
};
// https://www.faqcode4u.com/faq/573919/display-same-custom-error-message-for-any-string-type-error-express-joi

export const authLoginDTO = (req, res, next) => {
  const { error, value } = LOGIN_DTO.validate(
    req.body,
    validationConfiguration("email", "password")
  );

  // cada error tiene una variable
  // https://joi.dev/api/?v=17.6.0#objectunknown

  if (!error) return next();

  return res.status(401).json({
    ok: false,
    ...parseErrors(error.details),
  });

  // si no se que tipo es puedo verlo
  // return res.json({
  //   value,
  //   error,
  // });
};
