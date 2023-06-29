const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

const connectDb = async () => {
try {
    
await mongoose.connect(process.env.MONGO_URL)


} catch (error) {
   
}

}

module.exports = connectDb