import express from "express";
import jwt from "jsonwebtoken";
import SectionModel from "../models/Section.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await SectionModel.findOne({ email });
    if (user) {
      console.log("user ==> ", user);

      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        data: {
          token,
          user: {
            id: user._id,
            email,
          },
        },
        msg: "Section User logged in successfully",
      });
    }
    return user;
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
