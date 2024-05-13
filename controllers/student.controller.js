const express = require("express");
const { StudentModel } = require("../models/student.model");
const { authorization } = require("../middlewares/authorization");
const studentController = express.Router();

studentController.get(
  "/getAllStudents",
  authorization(["admin"]),
  async (req, res) => {
    try {
      const students = await StudentModel.find();
      res.json({ students });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
);

studentController.get(
  "/myProfile",
  authorization(["student"]),
  async (req, res) => {
    try {
      const data = await StudentModel.findOne({ student_id: req.userId });
      res.json({ data });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
);

studentController.patch(
  "/update/:id",
  authorization(["admin"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(req.body);
      const students = await StudentModel.findOneAndReplace(
        { _id: id },
        { ...req.body }
      );
      res.json({ students });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
);
studentController.delete(
  "/delete/:id",
  authorization(["admin"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const students = await StudentModel.findOneAndDelete({ _id: id });
      res.json({ message: "Deleted Succcessfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
);

module.exports = { studentController };
