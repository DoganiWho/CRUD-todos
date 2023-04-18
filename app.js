// import { readFile } from 'fs/promises'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT
import { router as todoRoutes } from './routes/app.routes.js'

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    });

app.use(cors());

app.use(bodyParser.json())

app.use('/api', todoRoutes)

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

// app.get('/', async (req, res) => { 
//     res.send( await readFile('./index.html', 'utf8'))
// });

// app.post('/', (req, res) => {});

// app.put('/', (req, res) => {});

// app.delete('/', (req, res) => {});

// export default app;


