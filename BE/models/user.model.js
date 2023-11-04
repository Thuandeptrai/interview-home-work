
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    dob: String,
}, {
    timestamps: true,
});
module.exports = mongoose.model('User', userSchema);