const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');


router.get('/', async(req,res)=>
{
    try{
            const data = await menu.find();
            console.log('data fetched');
            res.status(200).json(data);
        }
    catch(err)
    {
           console.log(err);
           res.status(500).json({error:'Internal Server Error'});     
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const menuitem = new menu(data);

        const response = await menuitem.save();
        console.log("Data Saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//comment added for testing in git 
module.exports = router;