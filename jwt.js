const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req,res,next)=>{

        //extract karna hai jwt token ko from headers
        const token = req.headers.authorization.split('')[1];
        //bearer index 0 pe jayega and token index 1 pe 
        if(!token) return res.status(401).json({error:'Unauthorized'});

        try{
             //verify jwt token
             const decoded = jwt.verify(token,process.env.JWT_SECRET);
             //if succes return payload
              
             req.user = decoded
             next(); //server ko send kardiya 
        }catch(err)
        {
            console.error(err);
            res.status(401).json({error:'Invalid Token'});
        }

}



//func to create token
const generateToken = (userdata) =>
{
    return jwt.sign(userdata,process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware,generateToken}