const express = require('express');
const Devices = require('./DeviceSchema');

const router = express.Router();

router.get('/searchProduct', async (req, res) => {
    try {
        const { search } = req.query;
        console.log('Search query:', search);

        const searchedProducts = await Devices.find({ category: { $regex: search, $options: 'i' } });

        console.log('Search results:', searchedProducts); 

        res.json({ status: 'success', data: searchedProducts });
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({ status: 'failed', msg: error.message });
    }
});

module.exports = router;
