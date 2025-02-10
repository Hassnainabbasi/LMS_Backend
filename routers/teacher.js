
import express from "express";
import jwt from "jsonwebtoken";
import TeachersModel from "../models/Teacher.js";
import verifyToken from "../middleware/verify-token.js";
import AdminModel from "../models/AdminModal.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { teacherEmail, teacherPassword } = req.body;

  try {
    const teacher = await TeachersModel.findOne({ teacherEmail, teacherPassword });

    if (!teacher) {
      return res.status(404).json({ message: "Invalid email or data" });
    }

    console.log("teacher ==> ", teacher);

    const token = jwt.sign(
      { id: teacher._id, teacherEmail, teacherPassword },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: {
        token,
        teacher: {
          id: teacher._id,
          teacherEmail,
          teacherPassword,
        },
      },
      msg: "Teacher logged in successfully",
    });

  } catch (error) {
    console.error("Error logging in teacher:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



router.get("/teacher-data", verifyToken, (req, res) => {
    res.status(200).json({ teacher: req.user });
  });
  

export default router;
