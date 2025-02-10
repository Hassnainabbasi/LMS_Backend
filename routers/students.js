import express from "express";
import StudentsModel from "../models/StudentModal.js";
const router = express.Router();

router.post("/import-students", async (req, res) => {
    try {
      const students = req.body; 
  
      if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: "Invalid students data" });
      }
  
      await StudentsModel.insertMany(students);
      res.status(201).json({ message: "Students imported successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  router.get("/import-students", async (req, res) => {
    try {
        const students = await StudentsModel.find(); 
        res.status(201).json({ message: "Students imported successfully",students : students });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  router.post("/students", async (req, res) => {
    try {
      console.log(req.body)
      const { name, rollno, email, phoneno, status, created, lastLogin, } = req.body;
  
      const hashpassword = await bcrypt.hash(rollno, 12);
      console.log("hashpassword=>", hashpassword);
  
      const newUser = new AdminModel({ name, rollno : hashpassword, email, phoneno, status, created, lastLogin });
      await newUser.save();
  
      return res.status(201).json({ message: "Student created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error });
    }
  });
  export default router