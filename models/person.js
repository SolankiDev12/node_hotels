const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    },
    username:{
        required : true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

personschema.pre('save',async function(next)
{
        const person = this;
        //hash if it is new or modified
        if(!person.isModified('password')) return next();

        try
        {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(person.password, salt);
            person.password = hashedPassword;
            next();
        }
        catch(err)
        {
            return next(err);
        }
})

personschema.methods.comparePassword = async function(candidatePassword)
{
    try{
            const isMatch = await bcrypt.compare(candidatePassword,this.password);
            return isMatch;
        }
    catch(err)
        {
            throw err;
        }
}

//create person model by usinng it we do operations on database 
const person = mongoose.model('person',personschema);
module.exports = person;

