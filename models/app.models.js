import mongoose from "mongoose";
// create template for new Todo
const TodoSchema = new mongoose.Schema(
    { name: {
        type: String, 
        required: true,
        }
    }, 
    { tags: Array[String] },
    { complete: Boolean },
    { timestamps: true },
    { collection: 'todosAndNotes'}
);

export {TodoSchema as Todo};