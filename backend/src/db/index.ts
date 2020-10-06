import mongoose from "mongoose";

export * from "./models";

export async function connect() {
  try {
    if (!process.env.DB_URL) {
      throw new Error(`DB_URL is required in env variables`);
    }

    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Successfuly connected to DB");
  } catch (err) {
    throw new Error("Couldn't connect to the DB" + "\n \n" + err);
  }
}
