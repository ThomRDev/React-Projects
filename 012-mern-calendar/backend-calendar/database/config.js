import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    throw new Error("Error a la hora de inicializar DB");
  }
};
