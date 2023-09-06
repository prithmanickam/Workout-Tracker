const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();


const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//require("./userDetails");
//const User = mongoose.model("UserInfo");

const taskRoutes = require("./routes/TaskRoute");
const authRoutes = require("./routes/AuthRoute");
const routineRoutes = require("./routes/RoutineRoute");

app.use("/api", taskRoutes);
app.use("/api", authRoutes);
app.use("/api", routineRoutes);

// to make tests clearer
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

module.exports = app;