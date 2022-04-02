const Details = require('../model/DetailsModel');
const express = require('express');
const router = express.Router();

// post new certification details
router.post('/postDetails',(req,res,next)=>{ 
    const data = req.body;

    let details = new Details({
        CertificationName:data.CertificationName,
        IssuerName:data.IssuerName,
        Certificate:data.Certificate,
    });
    
    details.save().then(()=>{
        res.json({message:'Certification Details Added Successfully'});
    }).catch((err)=>{
        res.status(400).json(err);
    })
   
});

// get detail
router.get('/getDetails', async (req,res,next)=>{
    const response = await Details.find();
    res.send(response);
})

module.exports = router;
