/*

const nameInput = document.querySelector('.todo-name');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click',  (e) => {
    e.preventDefault();
    const todoName = nameInput.value;
    const todosContainer = document.querySelector('.todo-container');
    const todosList = document.createElement('ol');
    todosContainer.appendChild(todosList)
    todosList.innerHTML += `
        <li>${todoName}</li>
    `;
    nameInput.value = ''
}); 

*/

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { todosRoutes } from './routes/app.routes.js';
const app = express();

//middleware
app.use('/', express.static('public'))
app.use(cors()); //to allow cross origin resource sharing
app.use(bodyParser.json()); //to convert our request data into JSON format
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', todosRoutes); // include the todoRoutes

//DB connection
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL /*|| 'mongodb://localhost:27017/CRUD-todos'*/;
import {MongoClient, ServerApiVersion} from 'mongodb';

const serverApi = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL, mongoOptions);
const client = mongoose.connection;

client.once('open', async () => {
    try {
        console.log('Connected to MongoDB');
        // start the server
        app.listen(PORT, () => {
            console.log(`app listening on http://localhost:${PORT}`);
        })
        await listDatabases(client)
    } finally {
        await client.close();
    }       
})

client.on('error', err => {
    console.log('DB connection errors', err);
})

/* MongoClient
// Either pass mongoOptions or serverApi as second param to the MongoClient constructor.
const client = new MongoClient(MONGODB_URL, mongoOptions);


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await app.listen(PORT, () => {
        console.log(`app listening on http://localhost:${PORT}`)
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // await listDatabases(client);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.error);
*/

// READ from database
// Print the names of all available databases
async function listDatabases(client) {
    // const databasesList = await client.db().admin().listDatabases();
    const databasesList = await client.db.admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



// READ from collection
// const todosCollection = client.db('CRUD-todos').collection('todosAndNotes');

async function findOneTodoByName(client, nameOfTodo) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await todosCollection.findOne({ name: nameOfTodo });

    if (result) {
        console.log(`Found a todo in the collection with the name '${nameOfTodo}':`);
        console.log(result);
    } else {
        console.log(`No todos found with the name '${nameOfTodo}'`);
    }
}


// CREATE new todo
async function createTodo(client, newTodo){
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
    const result = await todosCollection.insertOne(newTodo);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// app.post('/todos', (req, res) =>{
//         createTodo(client, req.body)
//         res.redirect('/');
// });

app.post('/todos', (req, res) => {
    client.collection('todosAndNotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.get('/', async (req, res) => {
//     var cursor = await todosCollection.find()
// })

/* Sample crud functions from MongoDB docs
// video: https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/?_ga=2.228432852.895337829.1681971319-1527537142.1681971316#learn-by-video

//  * Print Airbnb listings with a minimum number of bedrooms and bathrooms.
//  * Results will be limited to the designated maximum number of results.
//  * Results will be sorted by the date of the last review in descending order.
//  * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
//  * @param {object} queryParams The query params object
//  * @param {number} queryParams.minimumNumberOfBedrooms The minimum number of bedrooms
//  * @param {number} queryParams.minimumNumberOfBathrooms The minimum number of bathrooms
//  * @param {number} queryParams.maximumNumberOfResults The maximum number of Airbnb listings to be printed
 
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews")
        .find({
            bedrooms: { $gte: minimumNumberOfBedrooms },
            bathrooms: { $gte: minimumNumberOfBathrooms }
        }
        )
        .sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    // Store the results in an array
    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

*/