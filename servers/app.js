import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const authRouters = require("./routes/auth");
const categoryRourters = require("./routes/category");

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: "same-origin",
  })
);

app.use("/api", authRouters);
app.use("/api", categoryRourters);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
