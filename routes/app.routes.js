import express from 'express';
const router = express.Router();

/* import controllers */

import { 
    createTodo, 
    getTodoById, 
    getTodo, 
    deleteTodo, 
    getAllTodos, 
    updateTodo
} from '../controllers/app.controllers.js';


/* params */
// fetch value from url
router.param("todoId", getTodoById);

// to get all the todos
router.get("/todos/", getAllTodos);

// to get a single todo
router.get("/todo/:todoId/", getTodo);

// to create a todo
router.post("/todo/create/", createTodo);

// to update the todo
router.put("/todo/:todoId/update", updateTodo);

// to delete the todo
router.delete("/todo/:todoId/delete", deleteTodo);

export { router as todosRoutes };
