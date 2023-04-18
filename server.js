import mongoose from 'mongoose';
import app from './app.js';


const {MONGODB_URL} = process.env;

( async function(){
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log(`Database Connected SUCCESSFULLY`)
        const onListen = () => {
            console.log(`Listening on http://localhost:8080` );
        }
        app.listen(process.env.PORT || 8080, onListen)
    })
    .catch( error => {
        console.log(`DATABASE CONNECTION FAILED`);
        console.log(error);
        process.exit(1);
    })
})()





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