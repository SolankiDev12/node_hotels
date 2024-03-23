const mongoose = require('mongoose');

//will define person data ka schema how would it look
const personschema = new mongoose.Schema({
    name:{
        type: String,
        required: true, //name chahihiye hi 
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['Chef','Waiter','Manager'],
        required:true
    },
    mobile:{
        type: Number,
        required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type : Number,
        required:true
    }
});

//create person model by usinng it we do operations on database 
const person = mongoose.model('person',personschema);
module.exports = person;

