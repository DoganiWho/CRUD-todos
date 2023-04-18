// import mongoose from 'mongoose';
import app from './app.js';
import { MongoClient, ObjectId } from 'mongodb';
const {MONGODB_URL} = process.env;

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const client = new MongoClient(MONGODB_URL, mongoOptions)

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

const sampleDB = client.db('sample_airbnb').collection('listingsAndReviews')


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
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}
*/

/* DELETE */
/*
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
*/


/* List all databases */
/* async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db =>{
        console.log(`- ${db.name}`);
    })
 }
*/