const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.showRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};
exports.registerUser=async(req,res)=>{
    // try {
    //     const {name,email,password}=req.body;
    //     const user= await User.findOne({email});

        
    //     if(user){
    //         return res.render('register',{error:'user already exists'})
    //     }
    //     const hash=await bcrypt.hash(password,10)
    //     User.create({name,email,password:hash})
    //     res.redirect('/login')
    // } catch (error) {
    //      return res.render('register',{error:'user already exists'})
    // }
    //   try {
    //     console.log(req.body);
        
    //         const {email,password,name}=req.body;
    //          const user =await User.findOne({email})
    
    //          if(user){
    //            return res.render('user already  exit')
    //          }
    
    //         const hash = await bcrypt.hash(password,10)
    //         User.create({name,email,password:hash})
    //         res.redirect('/login')
    //     } catch (error) {
    //         return res.render('register',{error})
    //     }
    try {
        const {email,name,password}=req.body
        console.log(1,req.body);
        const user=await User.findOne({email})
        console.log(2,user);
        if (user){
            
            return res.flash('error','user already')

        }
        const hash =await bcrypt.hash(password,10)
        await User.create({name,email,password:hash})
        req.flash('success','register succesfully')
         res.redirect('/login')
        
    } catch (error) {
        
    }
}




exports.loginUser=async(req,res)=>{
// try {
//     const{email,password}=req.body;
//     const user= await User.findOne({email});
//     if(!user){
//         return res.render('login',{error:'user not found'})
//     }
//     const passwordMatch= await bcrypt.compare(password,user.password)
//     if(!passwordMatch){
//         return res.render('login',{error:'user not found'})
//     }
//     const token=jwt.sign({id:user._id},JWT_SECRET)
//     res.cookie('token',token)
//     res.redirect('/')   
// } catch (error) {
//      return res.render('login',{error:'user not found'})
// }
console.log('fdff');

//  try {
//         const {email,password}=req.body
//         console.log(req.body);
        
//         const user=await User.findOne({email})
//         console.log(user);
        
//         if (!user){
//            return res.render('usr not found')
//         }
//         const Comparepassword=await bcrypt.compare(password,user.password)
//         if(!Comparepassword){
//          return  res.render('incorrect pass')
//         }

//         const token=jwt.sign({id:User._id},JWT_SECRET)
//         console.log(2);
//         console.log(token);
//         res.cookie('token',token);
//         console.log('success');
        
//         res.redirect('/')
        
//     } catch (error) {
//         return res.render(error)
//         console.log(error);
        
//     }

try {
    const {email,password}=req.body
    const user= await User.findOne({email})
    console.log(2,user);
    
    if (!user){
        return res.flash('error','user not found')
    }
    const comparePass=await bcrypt.compare(password,user.password)
    if(!comparePass){
        console.log(32);
        
        return res.flash("error","wrong password")
    }
    const token=jwt.sign({id:user._id},JWT_SECRET)
    console.log(3,token);
    console.log('id' ,user._id);
    
    res.cookie('token',token)
    req.flash('success',"login successfully")
    res.redirect("/")
} catch (error) {
    res.render('error:' + error.message)
    console.log('error:' + error.message)
}
}

exports.logoutUser=(req,res)=>{
    try {
        res.clearCookie('token'); 
        res.redirect('/login');
    } catch (error) {
        res.redirect('/');
    }
}  