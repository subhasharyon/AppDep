const express = require('express');
const Devices = require('./DeviceSchema');

let router = express.Router();

router.get('/products/:category', async (req,res) => {
    
    const {category} = req.params;
    console.log('Recieved Category:', category);

    try {
        let productsData = await Devices.find({category: category});
        res.json({status: 'success', data: productsData});
    } catch (error) {
        console.log(error);
        res.json({status: 'failed', msg: error});
    }

});

module.exports = router;