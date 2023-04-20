import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, mongoOptions
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

import { todosRoutes } from "./routes/app.routes";

app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', express.static('public'))
app.use(bodyParser.json());
app.use('/api', todosRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = process.env.PORT;

app.listen(PORT || 8080, () => {
  console.log(`Server is listening on port ${PORT}`);
});