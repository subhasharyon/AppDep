const express = require('express');
const Profile = require('./ProfileSchema');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage: storage});

let router = express.Router();

router.post('/editProfile', upload.none(), async (req,res) => {
    console.log(req.body);

    try {
        console.log(req.body);
        console.log("uploaded files from the user");
        console.log(req.files);

        await Profile.updateMany({name:req.body.name, phone:req.body.phone, email: req.body.email});
        res.json({status: 'success', msg: 'profile updated successfully'});
    } catch (error) {
        console.log(error);
        res.json({status: 'failed', msg: error});
    }
});

router.delete('/deleteAccount', async (req,res) => {
    console.log(req.body);

    try {
        await Profile.deleteMany({email:req.query.email});
        console.log("Account Deleted Successfully");
        res.json({status:"success", msg:"Account Deleted Successfully"})
    } catch (error) {
        console.log("Unable to Delete the Account");
        res.json({status:'failed',msg:error});
    }
})

module.exports = router;