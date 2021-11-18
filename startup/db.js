const mongoose = require('mongoose');
const config = require('config');

function connectDB(){
    mongoose
    .connect(config.get('mongoURI'),
    {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MOndoDB...'))
    .catch((err) => {
        console.log(`Could not connect to MongoDB. Error: ${err}`);
        process.exit(1);
    });

}


module.exports = connectDB