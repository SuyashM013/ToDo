const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true

    },
    checked:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);