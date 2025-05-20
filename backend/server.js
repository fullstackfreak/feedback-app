const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const feedbackRoute = require("./routes/feedbackRoute");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "feedback-app-eight-iota.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => console.error(err));

app.use("/api/feedback", feedbackRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
