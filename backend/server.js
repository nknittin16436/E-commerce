const app = require('./app');
const dotenv = require('dotenv');
const connectToMongo = require('./config/database');
const cloudinary = require('cloudinary');


/************************************HANDLING UNCOUGHT ERROR/EXCEPTION ************************************************/
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to UNCOUGHT ERROR/EXCEPTION ');
    server.close(() => {
        process.exit(1);
    });

});


//CONFIG 
dotenv.config({ path: 'backend/config/config.env' });

//CONNECT TO DATABASE
connectToMongo(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})
// console.log(youtube);
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise');
    server.close(() => {
        process.exit(1);
    });

});