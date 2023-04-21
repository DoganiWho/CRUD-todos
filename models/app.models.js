import mongoose from "mongoose";
import timestamp from "./plugins/timestamp.js";

const TodoSchema = new mongoose.Schema(
    { todo: {
        type: String, 
        required: true,
        },
    }, { tags: {
        type: Array[String]
    }}
);

TodoSchema.plugin(timestamp);

export const Todo = mongoose.model('Todo', TodoSchema)

