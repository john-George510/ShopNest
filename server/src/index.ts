import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import productRoute from "./routes/product";
import cartRoute from "./routes/cart";
import orderRoute from "./routes/order";
import cors from "cors";
const app = express();

dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT, () => {
  console.log("server runnning");
});
