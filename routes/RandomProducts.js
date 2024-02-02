const express = require('express');
const Devices = require('./DeviceSchema');

let router = express.Router();

router.get('/randomProducts', async (req,res) => {

    try {
        const allProducts = await Devices.find();

        const numberofRandomProducts = 6;

        const randomProducts = getRandomItems(allProducts, numberofRandomProducts);

        res.json({status: 'success', data: randomProducts});
    } catch (error) {
        res.json({status: 'failed', msg: error});
        console.log(error);
    }
});

function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

router.get('/alexa', async (req,res) => {

    try {
        let alexaProducts = await Devices.find({category: 'smart speaker'});

    res.json({status: 'success', data: alexaProducts});
    } catch (error) {
        res.json({status: 'failed', msg: error});
        console.log(error);
    }
});

module.exports = router;