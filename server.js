// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layout/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, 
    // useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app listening on http://localhost:${process.env.PORT || 3000}`);
})
