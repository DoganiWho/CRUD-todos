import express from 'express';
const app = express();
const PORT = 8080;


// app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});

app.get('/', (req, res) => { 
    // res.sendFile(__dirname + './index.html') 
    res.send("<h1>Server Running!</h1>")
});

app.post('/', (req, res) => {});

app.put('/', (req, res) => {});

app.delete('/', (req, res) => {});

export default app;


