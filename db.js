// database ke saath conectivity bihtayega ye file

const mongoose = require('mongoose');


//define mongodb url 
const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser : true, //yeh naya url hai  makes sures we work with new mongodb
    useUnifiedTopology : true  //connection establish karne ke liye 
})

// database ke server ke saath connection ke liye responsible
const db = mongoose.connection; //mongoose ka connection node ke saath

db.on('connected',()=>
{
    console.log("Connected to MongoDb server");
});

db.on('error',(err)=>
{
    console.log("Error connecting to MongoDb server",err);
});

db.on('disconnected',()=>
{
    console.log("Disconnected to MongoDb server");
});


// export karke server file pe run karwana
module.exports = db;
