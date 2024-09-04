import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

const connectMongo = async () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Conecado com MongoDB"))
    .catch((err) => console.error(err));
};

export default connectMongo;
