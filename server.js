const express = require('express');
const app = express();
const PORT = 8080;


app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html') });