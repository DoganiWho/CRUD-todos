if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// import Modules
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
const cors = require('cors')

// import Routes
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const notesrouter = require('./routes/notes');

// Middleware
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layout/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//DB connection
const collection = 'todos'
const password = process.env.MONGODB_PASSWORD
const MONGODB_URI = `mongodb+srv://DoganiWho:${password}@todo-notes.pi5f4k1.mongodb.net/${collection}`
const port = process.env.PORT
 
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'))

// Start server
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/notes', notesrouter);

app.listen(port

|| 3000, () => {
    console.log(`app listening on http://localhost:${port || 3000}`);
})
