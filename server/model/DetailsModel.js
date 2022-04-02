const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    CertificationName:{
      type:String,
      required:true,
    },
    IssuerName:{
        type:String,
        required:true,
    },
    Certificate:{
        type:String,
        required:true,
    }
})

const certification = mongoose.model('certification',schema);
module.exports = certification;