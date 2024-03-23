
const express = require('express');
const app = express();

const db=require('./db');
// const person=require('./models/person');
// const menu=require('./models/menu');
// const book=require('./models/book');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const personrouter= require('./routes/personRoutes');

app.use('/person',personrouter);

const menurouter=require('./routes/menuItemRoutes');

app.use('/menu',menurouter);


app.listen(PORT,()=>{
  console.log('listening on port 3000');
})

