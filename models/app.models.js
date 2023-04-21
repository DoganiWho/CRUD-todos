import mongoose from "mongoose";
import { Model, Schema } from "mongoose";

// create template for new Todo
const TodoSchema = new Schema(
    { todo: {
        type: String, 
        required: true,
        },
    }, 
    { tags: {type: Array[String]} },
    { complete: Boolean },
    { timestamps: true },
    { collection: 'todosAndNotes'}
);

export const Todo = mongoose.model('Todo', TodoSchema)

// export {TodoSchema as Todo};