const express = require('express');
const Profile = require('./ProfileSchema');
const multer = require('multer');
const jwt = require('jsonwebtoken');
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

router.post('/validateUser', upload.none(), async (req,res) => {

    console.log(req.body);

    let userDetails = await Profile.find({email: req.body.email});

    if(userDetails.length > 0){
        let isPasswordCorrect = await bcrypt.compare(req.body.password, userDetails[0].password);
        let encryptedObj = ({email: req.body.email, password: req.body.password});
        let generatedToken =  jwt.sign(encryptedObj, 'lalala');
        if(isPasswordCorrect === true){
            res.json({status: 'success', data: userDetails[0], token: generatedToken});
        }else{
            res.json({status:'failed', msg:'email or password is incorrect'});
        }
    }else{
        res.json({status:'failed', msg:`User Doesn't Exists`});
    }
});

router.post('/loginThruToken', upload.none(), async (req,res) => {
    console.log(req.body);

    let decodedToken =  jwt.verify(req.body.token, 'lalala');

    let userDetails = await Profile.find({email:decodedToken.email});

    if(userDetails.length > 0){
        let isPasswordCorrect = await bcrypt.compare(decodedToken.password, userDetails[0].password);

        if(isPasswordCorrect){
            res.json({status:'success', data: userDetails[0]});
        }else{
            res.json({status:'failed', msg:'email or password is incorrect'});
        }
    }else{
        res.json({status:'failed', msg:"User Doesn't Exists"});
    }
    
})

module.exports = router;
