import mongoose from "mongoose";

const AssigmentSchema = new mongoose.Schema({
    assigmentName: { type: String, required: true },
    assigmentGroup: { type: String, required: true },
    description: { type: String, required: true },
    responsible: { type: String, required: true },
    deadline: { type: Date, required: true },
    assigmentImage: { type: String, required: false },
    teachersId: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers', required: true }
},
{
    timestamps : true
}
);

const AssigmentModel = mongoose.model("Assigment", AssigmentSchema);

export default AssigmentModel;
