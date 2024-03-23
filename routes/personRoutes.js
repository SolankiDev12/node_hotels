const express = require('express')
const router = express.Router();
const person = require('..//models/person');
const { route } = require('./personRoutes');

router.post('/',async (req,res)=>{
    try{
        const data =req.body;
        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
}
})


router.get('/', function(req,res)
{
    res.send('Aukaaatt!!!!');
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType; // extract karega from URL parameter
        if(workType == 'Chef' || workType=='Manager'|| workType=='Waiter'){
            const response = await person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }

    }catch(err)
    {
           console.log(err);
           res.status(500).json({error:'Internal Server Error'});     
    }
})

router.put('/:id',async (req,res)=>{  //id here is mongo db id 
    try{
            const personID = req.params.id;
            const updatedPersonData = req.body;

            const response = await person.findByIdAndUpdate(personID,updatedPersonData,{
                new : true,
                runValidators:true, //validations check kar lega 

            })
            if(!response)
            {
                return res.status(404).json({error:'Person not found'});
            }
            console.log('data updated');
        }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});  
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personID = req.params.id;

        const response = await person.findOneAndDelete(personID);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person Deleted Successfully'});
    }
    catch(err){
        console.error('Error deleting person:', err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


module.exports = router;