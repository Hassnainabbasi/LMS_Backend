import express from "express";
import CourseModel from "../models/AdCourse.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { courseName, courseDescription, trainer, section, batch, courseImage } = req.body;
  try {    
    const newCourse = new CourseModel({
      courseName,
      courseDescription,
      trainer,
      section,
      batch,
      courseImage,
    });
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const allcourses = await CourseModel.find()
//     .populate('sections')
//     .populate('batch')
//     .populate('trainer');
//     res.status(200).json({ message: "All Courses data", course : allcourses });
//   } catch (error) {
//     console.error("Error fetching batches:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Example for populating Course data
router.get("/", async (req, res) => {
  try {
    const allCourses = await CourseModel.find()
      .populate("section")
      .populate('trainer', 'trainerName trainerEmail')  // Direct population for trainer
      .populate('batch', 'batchNo startDate endDate status'); // Direct population for batch

    res.status(200).json({ message: "All Courses data", course: allCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { courseName, courseDescription, trainer, courseSection, courseBatch } = req.body;

  try {
    let courseImageUrl = req.body.courseImage; // Keep old image if not updated
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      { courseName, courseDescription, trainer, courseSection, courseBatch, courseImage: courseImageUrl },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
