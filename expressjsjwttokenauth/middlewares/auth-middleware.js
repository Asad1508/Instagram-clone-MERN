import  Jwt  from "jsonwebtoken";
import Usermodel from "../models/schema1user.js";
var checkuserauth= async (req,res,next)=>{
    let token

    const {authorization}=req.headers

     
        if(authorization && authorization.startsWith('Bearer'))
        {
            try {

            token=authorization.split(' ')[1]
            //verify token
            const {userid}=Jwt.verify(token,process.env.JWT_SECRET_KEY)

            
            req.user=await Usermodel.findById(userid).select('-password')
            next()
         
            } catch (error) {
                res.send({"status":"failed","message":"Unauthorized User"})    
            }
        }
        if(!token)
        {
            res.send({"status":"failed","message":"Unauthorized User, No token"})    
        }
    }

export default checkuserauth
