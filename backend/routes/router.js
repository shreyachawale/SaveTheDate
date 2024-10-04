const express=require('express');

//create more route and backend configurations
const router=express.router();
router.post('/create-checkout-session',async(res,req)=>{
    const{weddings}=req.body;


const session =await stripe.checkout.sessions.create({
    payment_method_types:['Card'],
    line_items:weddings,
    mode:"payment",
    success_url:"",
    cancel_url:""
})
res({id:session.id});

})


module.exports=router;

