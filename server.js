// import all the necessary packages
import express from 'express';
// import cors from 'cors';
import mongoose from "mongoose";
import { todosRoutes }from './routes/app.routes.js';
import { Todo } from './models/app.models.js'; //import TodoSchema

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// include the todoRoutes
app.use("/api", todosRoutes);

// DB connection
const server = 'localhost:27017'
const database = 'todosAndNotes'
const PORT = process.env.PORT || 8080;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => {
          console.log(`app listening to http://localhost:${PORT}`);
        });
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
  }
}


//get all todos
app.get('/', (req, res) => {
  const code = `Welcome to my CRUD todo-app!`;
  Todo.find()
  .sort("-createdAt")
  .then((result) => {
    res.render("index.ejs", {code, todos: result});
  }).catch(err => {
    res.status(400).json({
    error:
      err || "Some error occurred while retrieving todos.",
    });
  });
});

app.get('/todos/create', (req, res) => {
  res.render('new.ejs')
})

// create a new todo
app.post('/todos/create', (req, res) => {
const todo = new Todo(req.body)

todo.save().then(
  doc => {
    console.log(doc);
    res.redirect('/todos/create')
  }).catch(err => {
  console.error(err);
  res.render('new.ejs', {value})
  });
});


/* TODO: 
app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id
  try {
    const document = await Document.findById(id)
    res.render("new", { value: document.value })
  } catch (e) {
    res.redirect(`/${id}`)
  }
})

app.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const document = await Document.findById(id)

    res.render("code-display", { code: document.value, id })
  } catch (e) {
    res.redirect("/")
  }
})
*/


export default new Database();