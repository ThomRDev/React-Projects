import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

EventSchema.method("toJSON", function () {
  const { __v, _id, ...event } = this.toObject();
  event.id = _id;
  return event;
});

EventSchema.static("toJSON", function () {
  const { __v, _id, ...event } = this.toObject();
  event.id = _id;
  return event;
});

export default model("Event", EventSchema);
