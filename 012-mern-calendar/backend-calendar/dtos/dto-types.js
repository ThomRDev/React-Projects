import Joi from "joi";

export const nameDTOSchema = Joi.string().empty("").required().messages({
  "string.base": "El nombre debe de ser un string",
  "any.required": "El nombre es requerido",
});

export const passwordDTOSchema = Joi.string()
  .empty("")
  .min(6)
  .required()
  .messages({
    "string.base": "El password debe de ser un string",
    "string.min": "El password debe debe tener minimo {#limit} caracteres",
    "any.required": "El password es requerido",
  });

export const emailDTOSchema = Joi.string()
  .empty("")
  .email()
  .required()
  .messages({
    "string.base": "El email debe de ser un string",
    "string.email": "Debe ser un email valido",
    "any.required": "El email es requerido",
  });

export const titleDTOSchema = Joi.string()
  .empty("")
  .trim()
  .min(1)
  .required()
  .messages({
    "string.base": "El title debe de ser un string",
    "string.min": "El title debe de tener al menos un caracter",
    "any.required": "El title es requerido",
  });

export const startDTOSchema = Joi.date().required().messages({
  "date.base": "El campo start debe ser una fecha valida",
  "any.required": "El campo start es requerido",
});
export const endDTOSchema = Joi.date()
  .greater(Joi.ref("start"))
  .required()
  .messages({
    "date.base": "El campo end debe ser una fecha valida",
    "date.greater": "El campo end debe ser mayor que el campo start",
    "any.required": "El campo end es requerido",
  });

export const notesDTOSchema = Joi.string()
  .empty("")
  .trim()
  .min(1)
  .optional()
  .messages({
    "string.base": "Las notas deben de ser un string",
    "string.min": "Las notas tener al menos un caracter",
  });

export const validationConfiguration = (...fields) => ({
  allowUnknown: false,
  abortEarly: false,
  messages: {
    "object.unknown": `El campo [{#child}] no es valido, el body solo acepta los siguientes campos [ ${fields.join(
      ","
    )} ]`,
  },
});
// https://joi.dev/api/?v=17.6.0#dategreaterdate
// https://stackoverflow.com/questions/58425499/how-to-add-custom-validator-function-in-joi
