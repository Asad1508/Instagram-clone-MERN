import Usermodel from "../models/schema1user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailconfig.js";

class UserController{
    static userRegistration=async (req,res)=>{

        const {name,email,password,password_confirmation,tc}=req.body
   
        const user=await Usermodel.findOne({email:email})
        //agr mail match kr jati tu msg de k Email already exits    
        if(user)
        {
            res.send({"status":"failed","message":"Try another Email already exsits"})
        }
        else{
            //sab se pehly dekhy k fileds empty tu ni
            if(name && email && password && password_confirmation && tc)
            {
            
             if(password===password_confirmation){
                try {         
        //sab kuch clear hone k bd data send krna database me
        const salt=await bcrypt.genSalt(10)
        const hashpassword=await bcrypt.hash(password,salt)
        const doc =new Usermodel({
            
        //isme jo 2nd name jo likha wo ha jo user enter kre ga aur 2nd name db k field ka naam ha 
            name:name,
            email:email,
            password:hashpassword,
            tc:tc
        })
        await doc.save()
        const saved_user=await Usermodel.findOne({email:email})
        //generating jwt token
        const token=jwt.sign({userid:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
     
        res.send({"status":"success","message":"Registration Successfull","token":token})
            } catch (error) {
                res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
            }
             }
             else{
                res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
             }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
    }
//user login
static login=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(email && password){
        //ye code dekh rha k email registered ha ya ni
        const user= await Usermodel.findOne({email:email})
        //ye dekh rha k user ha ya ni 
        if(user !=null)
        {
       
          const isMatch=await bcrypt.compare(password,user.password)  
         //isme user.email yani db wali mail == ha ya ni email k aur password match kr rha ya ni
          if((user.email===email) && isMatch)
          {
            const token=jwt.sign({userid:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
            
            res.send({"status":"Success","message":"Login Success","token":token})     
          }
          else{
            res.send({"status":"failed","message":"Email or Password is not valid"})      
          }   
        }
        else{
            res.send({"status":"failed","message":"You are not registered User"})    
        }
    }
        else{
        res.send({"status":"failed","message":"All fields are required"})    
        }
    } catch (error) {
        res.send({"status":"failed","message":"Unable to Login"})    
    }
}
//Change Password
static changepassword=async (req,res)=>{
const {password,password_confirmation}=req.body
if(password&&password_confirmation){
if(password !==password_confirmation)
{
    res.send({"status":"failed","message":"Password and Confirm Password doesnot Match"})
}
else{
    const salt=await bcrypt.genSalt(10)
    const newhashpassword=await bcrypt.hash(password,salt)
    await Usermodel.findByIdAndUpdate(req.user._id,{$set:{password:newhashpassword}})
    res.send({"status":"success","message":"Password changed successfully"}) 
}
}
else{
    res.send({"status":"failed","message":"All fields are required"})    
    
}
}
//ye jo looged user ha uska data get kr rhe
static loggedUser=async (req,res)=>{
    res.send({"user":req.user})
}
//ye code yaha agr user password bhol gya tu reset kr skta mail pr link aye ga password reset ka
static senduserpasswordresetemail=async (req,res)=>{
    const {email}=req.body
    if(email)
    {

      const user=await Usermodel.findOne({email:email})
     
      if(user){
      
      const secret=user._id + process.env.JWT_SECRET_KEY    
      const token=jwt.sign({userid:user._id},secret,{expiresIn:'15m'})
      const link=`http://localhost:3000/api/user/reset/${user._id}/${token}`
       console.log(link)   
      //send email to change password by transporter

      let info=await transporter.sendMail({
          //isme jo EMAIL_FROM ha .env file me likha takay secure b rhe
          
          from:process.env.EMAIL_FROM,
          to:user.email,
          subject:"password reset link",
          html:`<a href=${link}>Click Here</a> to Reset your password`
          
      })
      
      res.send({"status":"success","message":"Password reset...Email sent..please check your email"})     
    }
      else{
        res.send({"status":"failed","message":"Email doesnot Exists"})   
      }
    }
    else{
        res.send({"status":"failed","message":"Email field is required"})           
    }
}

static userpasswordreset=async (req,res)=>{
    const {password,password_confirmation}=req.body
    const {id, token}=req.params
    const user =await Usermodel.findById(id)
    const new_token=user._id+ process.env.JWT_SECRET_KEY
    try {
        jwt.verify(token,new_token)
    if(password&&password_confirmation){
        if(password!==password_confirmation)
        {
            res.send({"status":"failed","message":"New password and confirm new password doesnot match"})   
        }
        else{
            const salt=await bcrypt.genSalt(10)
            const newhashpassword=await bcrypt.hash(password,salt)
            await Usermodel.findByIdAndUpdate(user._id,{$set:{password:newhashpassword}})
    res.send({"status":"success","message":"Password Reset successfully"}) 
        }
     }
     else{
        res.send({"status":"failed","message":"All Fields Are Required"})   
     }

    } catch (error) {
        res.send({"status":"failed","message":"Invalid Token"})   
    }
}
}
export default UserController
