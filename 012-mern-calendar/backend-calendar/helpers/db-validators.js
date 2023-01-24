import Event from "./../models/Event.js";
export const validateIfExists = async (id) => {
  const found = await Event.findById(id);
  if (!found) throw new Error(`El evento con el id ${id} no existe`);
};
