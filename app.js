import { readFile } from 'fs/promises'
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json())
// import path from 'path';

app.get('/', async (req, res) => { 
    res.send( await readFile('./index.html', 'utf8'))
});

// app.post('/', (req, res) => {});

// app.put('/', (req, res) => {});

// app.delete('/', (req, res) => {});

export default app;


