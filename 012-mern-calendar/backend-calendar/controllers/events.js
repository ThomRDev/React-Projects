import Event from "../models/Event.js";

const EventController = {};

EventController.getEvents = async (req, res) => {
  // const events = await Event.find().populate("user", "name");
  // const events = await Event.find({filtros}).populate("user", "name email");
  const events = await Event.find().populate("user", "name email");
  res.json({
    ok: true,
    events,
  });
};
EventController.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);

    event.user = req.uid;

    const eventSaved = await event.save();

    res.json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
EventController.updateEvent = async (req, res) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    // el new:true, me devuelve el actualizado
    const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
EventController.deleteEvent = async (req, res) => {
  const eventID = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventID);
    // const { deletedCount  } = await Event.deleteOne({ _id:eventID })

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

export default EventController;
