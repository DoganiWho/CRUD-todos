import mongoose from "mongoose";

const Todo = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    }, 
    }, {timestamps: true}
);

export default mongoose.model('Todo', Todo);