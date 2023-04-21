import { Todo } from "../models/app.models.js";


const getTodoById = (req, res, next, todoId) => {
  // todoId is coming from the router.param
  // .findById() method will find the todo which has id==todoId
  Todo.findById(todoId)
    .then((data) => {
      req.todo = data;
      
    })
    .catch((err) => {
      res.status(404).json({
      error: "404 Todo not found", err
      });
    next();
    });
};


const getAllTodos = (req, res) => {
  // simply use .find() method and it will return all the todos
  Todo.find()
    .sort("-createdAt")
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({
        error:
          err || "Some error occurred while retrieving todos.",
      });
    });
};

const getTodo = (req, res) => {
  // this is pretty simple because we've already defined a middleware
  // to get a todo from the URL id
  // this req.todo is coming from that middleware
  return res.json(req.todo);
};

const createTodo = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  const todo = new Todo(req.body);

  // create a todo instance by passing 'todo' field from 'req.body'
  todo.save()
  .then( data => {
    res.json({data});
  })
  .catch(err => {
    res.status(400).json({
      error: err || 'an error occured while creating the Todo'
    });
  });
};


const updateTodo = (req, res) => {
  const todo = req.todo;
  todo.task = req.body.task;

  todo.save((err, t) => {
    if (err || !t) {
      return res.status(400).json({
        error: "something went wrong while updating",
      });
    }
    // send the updated todo as a json response
    res.json(t);
  });
};
  

// Delete a message with the specified messageId in the request
const deleteTodo = (req, res) => {
  const todo = req.todo;
  // call .remove() method to delete it
  todo.remove((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "something went wrong while deleting the todo",
      });
    }
    // send deleted todo and success message as a json response
    res.json({
      task_deleted: task,
      message: "Todo deleted successfully!",
    });
  });
};

export { getTodoById, getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };




//================


/* // create a new todo
let todo = new Todo({
  todo: 'make a MERN app'
})

todo.save().then(
  doc => {
    console.log(doc);
  }
).catch(err => {
  console.error(err);
})

*/

/* // find one todo
Todo.find({
  todo: 'make a MERN app' //search query
}).then(
  doc => {
    console.log(doc);
  }
).catch(err => {
  console.error(err);
})
*/

/* //update one todo
Todo.findOneAndUpdate({
  todo: 'make a MERN app' //search query
}, {
  todo: 'connect to MongoDB'
}, {
  new: true // return updated doc
}).then(
  doc => {
    console.log(doc);
  }
).catch(err => {
  console.error(err);
})

*/

/* // remove one todo
Todo.findOneAndRemove({
  todo: 'connect to MongoDB'
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
*/
