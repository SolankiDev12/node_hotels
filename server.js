
const express = require('express');
const app = express();

const db=require('./db');
const person=require('./models/person');
// const menu=require('./models/menu');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const logRequest = (req,res,next)=>{
  console.log(`${new Date().toLocaleString()}Request Made to:${req.originalUrl}`);
  next();
}

app.use(logRequest);

passport.use(new LocalStrategy(async(username,password,done)=>{
  try
  {
      console.log('Received credentials:',username,password);
      const user =await  person.findOne({ username });
      if(!user)
        return done(null,false,{message:'Incorrect Username..'});

      const isPasswordMatch = user.password === password ? true: false;
      if(isPasswordMatch)
      {
        return done(null,user);
      }else{
        return done(null,false,{message:'Incorrect password..'});
      }

  }catch(err){
        return done(err);
    }
}))
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

//Middleware function
app.get('/',localAuthMiddleware , function (req,res){
      res.send('Welcome to Dhaba'); 
});


const personrouter= require('./routes/personRoutes');

app.use('/person',localAuthMiddleware,personrouter);

const menurouter=require('./routes/menuItemRoutes');

app.use('/menu',localAuthMiddleware,menurouter);


app.listen(PORT,()=>{
  console.log('listening on port 3000');
})

