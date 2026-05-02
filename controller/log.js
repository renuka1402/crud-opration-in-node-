const user=require('../models/User')
const bcrypt=require('bcrypt.js')
const jwt=('jsonwebtoken')

exports.showRegiste=(req,res)=>res.render('/register',{error:null})

exports.showlogin=(req,res)=>res.render('/login',{error:null})

exports.rigister=async(req,res)=>{
    try {
        const {email,password,name}=req.body;
         const user =await user.findOne(email)

         if(user){
            res.render('user already  exit')
         }

        const hash = await bcrypt.hash(password,10)
        user.create({name,email,password:hash})
        res.render('/login')
    } catch (error) {
        res.render('error',+ error)
    }
}

exports.loginUser= async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await user.findOne(email)
        if (!user){
           return res.render('usr not found')
        }
        const Comparepassword=await bcrypt.compare(user.password,password)
        if(!Comparepassword){
         return  res.render('incorrect pass')
        }

        const token=jwt.sign({id:user._id,email},JWTSCREATEKEY)
        req.cookie=token;
        res.render('/')
        
    } catch (error) {
        return res.render(error)
    }
}

exports.logout =async (req,res)=>{
    try {
        res.clearCookie('token')
        res.render('/login')
    } catch (error) {
         res.render(error)
    }
}