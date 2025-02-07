import express from "express";
import AssigmentModel from "../models/AssigmentModel.js";
const router = express.Router();


router.post('/assigment', async (req, res) => {
    const { 
        assignmentName,
        assignmentGroup,
        description,
        responsible,
        deadline,
     files } = req.body;
 
    try {
        const teacher = new AssigmentModel({
            assignmentName,
            assignmentGroup,
            description,
            responsible,
            deadline,
         files
        });
        await teacher.save();
        res.status(201).json({ message: "Assigment added successfully", assigment : teacher });
    } catch (error) {
        res.status(400).json({ message: "Server error", error  });
    }
});

router.get('/assigment', async (req, res) => {
    try {
        const teachers = await AssigmentModel.find();
        res.json({ message: "Assigment added successfully", assigment : teachers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router