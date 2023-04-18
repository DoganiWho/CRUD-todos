
import mongoose from 'mongoose';
import app from './app.js';


let PORT = 8080
const MONGODB_URL = process.env;
/* 


exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {

    })
    .catch( error => {
        console.log(`DATABASE CONNECTION FAILED`);
        console.log(error);
        process.exit(1);
    })
}

*/

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