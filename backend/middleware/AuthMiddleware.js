const User = require("../models/User");
const jwt =require('jsonwebtoken');
module.exports.checkuser=(req,res,next)=>{
const token=req.cookies.jwt;
if(token){
    jwt.verify(token,'MPRPROJECT',async(err,decodedToken)=>{
        if(err){
            res.json({status:false});
            next();

        }else{
            try{
                const user = await User.findById(decodedToken.id);


            if(user)res.json({status:true,user:user.email})
                else{
                    res.json({status:false});
                    next();
            }
        }catch(err){
            console.log(err)
        }
}

});

}
else{
     res.json({status:false});
     next();
}
}