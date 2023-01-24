import Joi from "joi";
import { parseErrors } from "../helpers/parseErrors.js";
import {
  endDTOSchema,
  notesDTOSchema,
  startDTOSchema,
  titleDTOSchema,
  validationConfiguration,
} from "./dto-types.js";
const CREATE_EVENT_DTO = Joi.object({
  title: titleDTOSchema,
  start: startDTOSchema,
  end: endDTOSchema,
  notes: notesDTOSchema,
});

const UPDATE_EVENT_DTO = Joi.object({
  title: titleDTOSchema,
  start: startDTOSchema,
  end: endDTOSchema,
  notes: notesDTOSchema,
});

export const eventCreateDTO = (req, res, next) => {
  const { error, value } = CREATE_EVENT_DTO.validate(
    req.body,
    validationConfiguration("title", "start", "end")
  );

  if (!error) {
    return next();
  }
  return res.status(401).json({
    ok: false,
    ...parseErrors(error.details),
  });
};
export const eventUpdateDTO = (req, res, next) => {
  const { error, value } = UPDATE_EVENT_DTO.validate(
    req.body,
    validationConfiguration("title", "start", "end")
  );

  if (!error) {
    return next();
  }
  return res.status(401).json({
    ok: false,
    ...parseErrors(error.details),
  });
};
