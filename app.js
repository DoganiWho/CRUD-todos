import { readFile } from 'fs/promises'
import express from 'express';
const app = express();



// app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});

app.get('/', async (req, res) => { 
    res.send( await readFile('./index.html', 'utf8'))
});

// app.post('/', (req, res) => {});

// app.put('/', (req, res) => {});

// app.delete('/', (req, res) => {});

export default app;


