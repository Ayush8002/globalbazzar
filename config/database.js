const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(process.env.DB_URI, () => {
        console.log('Connect to Mongo Successfully')
    })
}

module.exports = connectToMongo;