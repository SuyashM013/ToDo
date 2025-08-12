const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Connected to Database")
        });

    }
    catch (err) {
        console.log('Mongo Connection Failed', err);
    }

}


module.exports = ConnectDB;