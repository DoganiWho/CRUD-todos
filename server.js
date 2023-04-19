
/*
// import mongoose from 'mongoose';
import {readFile} from 'fs/promises'
import express from 'express';
import bodyParser from 'body-parser';
// import expressRouter from 'express-router'; 
const router = express.Router();
import { MongoClient} from 'mongodb';
 
import documentSchema from './models/Document.js';

const {MONGODB_URL} = process.env;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const client = new MongoClient(MONGODB_URL, mongoOptions)

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => { 
    res.send( await readFile('./views/index.html', 'utf8'));
});

app.post('/save', async (req, res) => {
    const value = req.body.value;
    try {
        const document = await documentSchema.create({value});
        res.redirect(`/${document.id}`)
    } catch (error) {
        res.redirect('/', {value})
    }
})

app.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
       const document = await documentSchema.findById(id);
       res.send(await readFile('./views/index.html', 'utf8'), document.value)
    } catch (error) {
        res.redirect('/')
    }
})


async function run(){
    try {
        await client.connect();
        const onListen = () => {
            console.log(`App listening on http://localhost:8080` );
        }
        app.listen(process.env.PORT || 8080, onListen);
    } catch (error) {
        console.log('Connection FAILED!');
        console.log(error);
        process.exit(1);
    } finally {
        await client.close()
    }
  }

run().catch(console.error);

*/


/* CREATE */
/* async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection('listingsAndReviews').insertOne(newListing);
    
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
*/

/* READ  */
/* 
async function findOneListing(client, nameOfListing) {
    const result = await sampleDB.findOne({name: nameOfListing})
    
    if (result) {
        console.log(`Found one listing with the name '${nameOfListing}'`);
    } else {
        console.log(`No listing found with the name '${nameOfListing}'`);
    }
}
*/

/* UPDATE */
/* 

*/

/* DELETE */

/* List all databases */
/* async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db =>{
        console.log(`- ${db.name}`);
    })
}
*/



// import all the necessary packages
import express from "express";
import cors from "cors";
import {readFile} from 'fs/promises'
import bodyParser from "body-parser";
const {MONGODB_URL} = process.env
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

import { todoRoutes } from "./routes/app.routes.js";
import { MongoClient } from "mongodb";
import Todo from "./models/app.models.js";

const app = express();


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => { 
    res.send( await readFile('./views/index.html', 'utf8'));
});


// DB connection
const client = new MongoClient(MONGODB_URL, mongoOptions)
const database = client.db('CRUD-todos').collection('todosAndNotes')
// const sampleDB = client.db('sample_airbnb').collection('listingsAndReviews')

async function run(){
    try {
        await client.connect();
        // await createTodo(client, {task: "code"})
        const onListen = () => {
            console.log(`App listening on http://localhost:8080` );
        }
        // app.use(cors());
        // app.use(bodyParser.json());
        // app.use("/api", todoRoutes);
        app.listen(process.env.PORT || 8080, onListen);
    } catch (error) {
        console.log('Connection FAILED!');
        console.log(error);
        process.exit(1);
    } finally {
        await client.close()
    }
  }

run().catch(console.error);


async function createTodo(client, newTodo){
    const result = await database.insertOne(newTodo);
    console.log(`New todo created with the following id: ${result.insertedId}`);
}


async function findOneTodoByName(client, nameOfTodo) {
    const result = await database.findOne({ todo: nameOfTodo });

    if (result) {
        console.log(`Found a todo in the collection with the name '${nameOfTodo}':`);
        console.log(result);
    } else {
        console.log(`No todo found with the name '${nameOfTodo}'`);
    }
}