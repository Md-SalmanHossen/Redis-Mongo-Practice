import express from 'express';
import redis from './connections/redis.js';

const otpRouter = express.Router();

function otpKey(phone){
   return `otp:${phone}`
}

otpRouter.post('/otp',async(req,res)=>{
   
   const {phone}=req.body;
   const otp=Math.floor(100000+Math.random()*90000).toString();

   await redis.set(otpKey(phone),otp,'EX',30);

   res.json({
      message:"OTP sent",otp
   });
 
});

otpRouter.post("/otp/verify",async(req ,res)=>{
   const {phone}=req.body;
   const savedOtp=await redis.get(otpKey(phone));

   if(!savedOtp){
      return res.status(400).json({message:'Invalid OTP'});
   }
   
   await redis.del(otpKey(phone));
   res.json({message:'OTP verified successfully'});

});

otpRouter.get('/otp/:phone/ttl',async(req,res)=>{
   const ttl=await redis.ttl(otpKey(req.params.phone));
   res.json({ttl});
});


export default otpRouter; 