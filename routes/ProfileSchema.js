const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({

    name: String,
    phone: Number,
    email: String,
    password: String,

});

let Profile = new mongoose.model('profiles', profileSchema);

module.exports = Profile;
