const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;



// Define the Variables of Database
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    movieWatchlist: [String]


}, {timestamps: true});

userSchema.plugin(passportLocalMongoose);

// Model Setup
const User = mongoose.model('User', userSchema);
module.exports = User;