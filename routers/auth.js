import express from "express";
import UserModel from "../models/Users.js";
import AdminModel from "../models/AdminModal.js";
import AnnouncementModel from "../models/Announcment.js";
import CommentModel from "../models/Comments.js";
import ReportsModel from "../models/Report.js";
import SectionModel from "../models/Section.js";
import BatchModel from "../models/Batch.js";
import TeachersModel from "../models/Teacher.js";
import bcrypt from "bcrypt";

const router = express.Router();

// router.post("/login", async (req, res) => {
//   try {
//     console.log(req.body)
//     const { email, password } = req.body;

//     const hashpassword = await bcrypt.hash(password, 12);
//     console.log("hashpassword=>", hashpassword);

//     const newUser = new AdminModel({ email, password: hashpassword });
//     await newUser.save();

//     return res.status(201).json({ message: "Admin created successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong", error });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    console.log(req.body,"body")

  if (!email || !password) {
    return res.status(500).json({ error: true, msg: "Email and password are required" });
  }
  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(403)
        .json({ error: true, msg: "Incorrect Email" });
    }

    const checkpassword = await bcrypt.compare(password, admin.password);
    if (!checkpassword) {
      return res.status(403).json({ error: true, msg: "Invalid Password" });
    }

    return res.status(200).json({
      error: false,
      data: { admin: { email: admin.email }},
      msg: "Admin logged in successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const alladmin = await AdminModel.find(); // Fetch all users from the database
    res.status(200).json({
      message: "All Users Data",
      users: alladmin,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

router.post("/announcment", async (req, res) => {
  const { title, summary, reason } = req.body;
  try {
    if ((!title, !summary, !reason)) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const newAnnouncement = new AnnouncementModel({
      title,
      summary,
      reason,
    });
    await newAnnouncement.save();

    res
      .status(201)
      .json({ message: "Announcement S successfully", data: newAnnouncement });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/announcment", async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find();

    if (!announcements || announcements.length === 0) {
      return res.status(404).json({ message: "No announcements found" });
    }

    res.status(200).json({
      message: "Announcements fetched successfully",
      data: announcements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/comments", async (req, res) => {
  const { userId, username, content } = req.body;
  try {
    const newComment = new CommentModel({
      userId,
      content,
      username,
    });
    await newComment.save();

    res
      .status(201)
      .json({ message: "Comment registered successfully", data: newComment });
  } catch (error) {
    console.error("Error registering Comment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/comments", async (req, res) => {
  try {
    const comments = await CommentModel.find();

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }

    res
      .status(200)
      .json({ message: "Comments fetched successfully", data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/report", async (req, res) => {
  const { formname, description, detailmsg } = req.body;
  try {
    const newReport = new ReportsModel({
      formname,
      description,
      detailmsg,
    });
    await newReport.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: newReport });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/report", async (req, res) => {
  try {
    const reports = await ReportsModel.find();

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    res
      .status(200)
      .json({ message: "Reports fetched successfully", data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, cnic, phone, address, purpose, tokenNo } = req.body;
  try {
    const existingUser = await UserModel.findOne({ cnic });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this CNIC already exists" });
    }

    const newUser = new UserModel({
      name,
      cnic,
      phone,
      address,
      purpose,
      tokenNo,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/teachers", async (req, res) => {
  const {teacherName, teacherEmail, teacherPhone, teacherBio, teacherPassword, teacherImage} = req.body;
  try {
    const newteachers = new TeachersModel({
      teacherName,
      teacherEmail,
      teacherPhone,
      teacherBio,
      teacherPassword,
      teacherImage
    });
    await newteachers.save();

    res
      .status(201)
      .json({
        message: "teachers registered successfully",
        teachers: newteachers,
      });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/teachers", async (req, res) => {
  try {
    const allteacherss = await TeachersModel.find();
    res
      .status(201)
      .json({ message: "All teachers Data", teachers: allteacherss });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/section", async (req, res) => {
  const { sectionName, sectionTiming, course, teachers, batch, status } =
    req.body;
  try {
    const newSection = new SectionModel({
      sectionName,
      sectionTiming,
      course,
      teachers,
      batch,
      status,
    });

    await newSection.save();

    res
      .status(201)
      .json({
        message: "Section registered successfully",
        section: newSection,
      });
  } catch (error) {
    console.error("Error registering section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/section", async (req, res) => {
  try {
    const allsections = await SectionModel.find()
      .populate("course")
      .populate("batch")
      .populate("teachers");
    res
      .status(200)
      .json({ message: "All sections data", section: allsections });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/batch", async (req, res) => {
  const { batchNo, status, course } = req.body;
  try {
    const newBatch = new BatchModel({
      batchNo,
      status,
      course,
    });

    if (status === "end") {
      newBatch.endDate = new Date();
    }

    await newBatch.save();

    res
      .status(201)
      .json({ message: "Batch registered successfully", batch: newBatch });
  } catch (error) {
    console.error("Error registering batch:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/batch", async (req, res) => {
  try {
    const allBatches = await BatchModel.find().populate("course");
    res.status(200).json({ message: "All batch data", batch: allBatches });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/register", async (req, res) => {
  try {
    const allUsers = await UserModel.find(); // Fetch all users from the database
    res.status(200).json({
      message: "All Users Data",
      users: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/register/:id", async (req, res) => {
  const { id } = req.params; // Make sure this matches the URL path
  const { name, cnic, phone, address, purpose, tokenNo } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, cnic, phone, address, purpose, tokenNo },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/register/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

