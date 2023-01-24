import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// funciona si se hace el new model
UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.id = _id;
  return user;
});

// funciona si con solo llama al modelo
UserSchema.static("toJSON", function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.id = _id;
  return user;
});

export default model("User", UserSchema);
// https://mongoosejs.com/docs/validation.html#custom-error-messages
// https://mongoosejs.com/docs/guide.html#statics
