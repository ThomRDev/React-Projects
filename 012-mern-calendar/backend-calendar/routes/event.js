import { Router } from "express";
import { param } from "express-validator";
import EventController from "../controllers/events.js";
import { validateIfExists } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateFields } from "../middlewares/validateFields.js";
import { eventCreateDTO, eventUpdateDTO } from "./../dtos/index.js";
const EventRouter = Router();

EventRouter.use(validateJWT);

EventRouter.get("/", EventController.getEvents);
EventRouter.post("/", [eventCreateDTO], EventController.createEvent);
EventRouter.put(
  "/:id",
  [
    param("id", "El id no es valido").isMongoId().custom(validateIfExists),
    validateFields,
    eventUpdateDTO,
  ],
  EventController.updateEvent
);
EventRouter.delete(
  "/:id",
  [
    param("id", "El id no es valido").isMongoId().custom(validateIfExists),
    validateFields,
  ],
  EventController.deleteEvent
);
export default EventRouter;
