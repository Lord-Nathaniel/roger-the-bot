//Module to import when the use of MongoDB is required
const mongoose = require('mongoose');
const { mongoPath } = require('./config.json');

//use of async function allow to use await
module.exports = async() => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose;
}