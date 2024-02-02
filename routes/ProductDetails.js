const express = require('express');
const Devices = require('./DeviceSchema');

let router = express.Router();

router.get('/productDetails/:productId', async (req,res) => {

    const {productId} = req.params;

    try {
        const productDetails = await Devices.findById(productId);
        res.json({status: 'success', data: productDetails});
    } catch (error) {
        res.json({status: 'failed', msg: error});
    }
});

module.exports = router;