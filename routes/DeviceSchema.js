const mongoose = require('mongoose');

let deviceSchema = new mongoose.Schema({

    name: String,
    price: String,
    color: String,
    rating: Number,
    image: String,
    category: String,
    about_this_item: String,

});


let Devices = new mongoose.model('device', deviceSchema);

module.exports = Devices;
