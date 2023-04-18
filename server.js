// import mongoose from 'mongoose';
import app from './app.js';
import { MongoClient, ObjectId } from 'mongodb';
const {MONGODB_URL} = process.env;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// const state = {
//     db: null
// };

const client = new MongoClient(MONGODB_URL, mongoOptions)

/*
const connect = (callback) => {
    if (state.db) {
        callback();
    } else {
        mongoose.connect(MONGODB_URL, mongooseOptions, (err, client) => {
            if (err) {
                callback(err);
            } else {
                state.db = client.db(dbName);
                callback();
            }
        });
    }
}

*/
async function run(){
    await client.connect()
    .then( () => { 
        client.db("admin").command({ ping: 1 })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const onListen = () => {
            console.log(`Listening on http://localhost:8080` );
        }
        app.listen(process.env.PORT || 8080, onListen);
    })
    .catch( error => {
        console.log('Connection FAILED!');
        console.log(error);
        process.exit(1);
    })
  }

run().catch(console.dir);


// mongoose.connect(MONGODB_URL, mongooseOptions)
    // .then( () => {
    //     console.log(`Database Connected SUCCESSFULLY`);
    //     const onListen = () => {
    //         console.log(`Listening on http://localhost:8080` );
    //     }
    //     app.listen(process.env.PORT || 8080, onListen);
    // })
    // .catch( error => {
    //     console.log(`DATABASE CONNECTION FAILED`);
    //     console.log(error);
    //     process.exit(1);
    // })


// const getPrimaryKey = (_id) => {
//     return ObjectId;
// }

// const getDB = () => {
//     return state.db
// }

// export {getDB, getPrimaryKey};

/*

( async function(){
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( 
        console.log(`Database Connected SUCCESSFULLY`)
        )
        .catch( error => {
            console.log(`DATABASE CONNECTION FAILED`);
            console.log(error);
        process.exit(1);
    })
})()

*/

/* 

( async function(){
    try {
        await mongoose.connect('mongodb://localhost:27017/todos')
        console.log("Connected to Database!");
        
        const onListen = () => {
            console.log(`Listening on port: ${PORT}` );
        }
        
        app.listen(PORT, onListen)
    } catch (error) {
        console.error('Error: ', error);
    }
})()

*/