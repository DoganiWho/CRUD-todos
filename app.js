import { readFile } from 'fs/promises'
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json())
// import path from 'path';

// app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});
/*

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res) => {

});

*/
app.get('/', async (req, res) => { 
    res.send( await readFile('./index.html', 'utf8'))
});

// app.post('/', (req, res) => {});

// app.put('/', (req, res) => {});

// app.delete('/', (req, res) => {});

export default app;


