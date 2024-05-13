const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { StudentModel } = require("../models/student.model");

require("dotenv").config();

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  if (!(email && password && name)) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.status(400).json({
        message: "User already exists. Please login!",
      });
    }

    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      try {
        const user = await UserModel.create({
          ...req.body,
          password: hash,
        });

        let obj = {
          name,
          student_id: user._id,
          year: null,
          stream: null,
          subject: null,
        };

        const studentCreated = await StudentModel.create(obj);

        res.json({ message: "User signed up successfully" });
      } catch (error) {
        if (error?.name === "ValidationError") {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal Server Error", abc: error });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Please fill all the details" });
  }

  try {
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        message: "User does not exist. Please Signup!",
      });
    }

    bcrypt.compare(password, userExist.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { role: userExist.role, userId: userExist._id },
          process.env.JWT_SECRET
        );
        return res.json({
          message: "login succcessful",
          userData: {
            token: token,
            name: userExist.name,
            role: userExist.role,
          },
        });
      } else {
        return res.status(400).json({
          message: "Wrong credentials!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { userController };
