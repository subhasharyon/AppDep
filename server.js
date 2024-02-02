const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const insertDataRoute = require('./routes/InsertData');
const LoginRoute = require('./routes/Login');
const editRoute = require('./routes/EditProfile');
const productRoute = require('./routes/Products');
const productDetailsRoute = require('./routes/ProductDetails');
const searchProductRoute = require('./routes/Search');
const randomProductsRoute = require('./routes/RandomProducts');

dotenv.config();


let app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use('/', insertDataRoute);
app.use('/', LoginRoute);
app.use('/', editRoute);
app.use('/', productRoute);
app.use('/', productDetailsRoute);
app.use('/', searchProductRoute);
app.use('/', randomProductsRoute);

app.listen(process.env.port, () => {
    console.log(`Listening from Port: ${process.env.port}`);
});

let connectToDB = async () => {

    try {
        await mongoose.connect(process.env.dbpath);
        console.log("Successfully Connected to Database");
    } catch (error) {
        console.log('Unable to connect', error);
    }
}

connectToDB();
