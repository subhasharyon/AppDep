const express = require('express');
const Profile = require('./ProfileSchema');
const multer = require('multer');
const bcrypt = require('bcrypt');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

router.post('/insertData', upload.none(), async (req,res) => {
    console.log(req.body);

    try {
        let userArr = await Profile.find({email: req.body.email});
        if (userArr > 0) {
            console.log('User Already Exists');
        } else {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);

            let newUSer = Profile({

                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                
            });
            await newUSer.save();
            res.json({status: 'success', msg: 'User Created Successfully'});
        }
    } catch (error) {
        res.json({status: 'failed', msg: error});
    }
});

module.exports = router;