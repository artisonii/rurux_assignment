const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { studentController } = require("./controllers/student.controller");
const { authorization } = require("./middlewares/authorization");
const { userController } = require("./controllers/user.controller");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: [process.env.FRONTEND],
    credentials: true,
  })
);
app.use(express.json());

app.use("/user", userController);
app.use("/students", studentController);

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log("Error while connection to db");
    console.log(error);
  }
  console.log("server is running");
});
