const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const feedbackRoute = require("./routes/feedbackRoute");
const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://feedback-app-eight-iota.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => console.error(err));

app.use("/api/feedback", feedbackRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
