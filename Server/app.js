if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./models/users');
const Doc=require('./models/docs');
const bodyParser = require("body-parser");
const cors = require('cors');
const validatePhoneNumber = require('validate-phone-number-node-js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRETKEY = "laksh@123";
var str = require('string-validator')
const EmailValidator = require('email-deep-validator');
const nodemailer = require("nodemailer");
const {cloudinary}=require('./cloudinary/index');
const fileUpload = require('express-fileupload');
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}));
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
  //  useCreateIndex:true,
    useUnifiedTopology: true
})

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DATABASE CONNECTED");
})

app.get('/',(req,res)=>{
    res.send("hello");
})
//jwt
const verifyToken = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (bearer) {
            const bearerToken = bearer.split(" ");
            const token = bearerToken[1];
            jwt.verify(token, SECRETKEY, (err, decoded) => {
                if (err) {
                    res.json(false)
                }
                else {
                    next();
                   
                    res.json({decoded});
                }
            });
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        console.log(err.message);
    }
}

app.post('/check', verifyToken, (req, res) => {
})
//logout
app.post('/logout', verifyToken, (req, res) => {
    console.log("logout");
})
//register
app.post('/adduser',async(req,res)=>{
   console.log(req.body);
    User.findOne({ email: req.body.email },async (err, found) => {
       
        if (err) {
            console.log(err);
        } else {
            if (found) {
                
                return res.json({message:"User already exists with this email"});
            } else {
                
                var containsValid = str.contains('@yahoo.com');
                const emailValidator = new EmailValidator();
                const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.email);
                if(containsValid(req.body.email)===false){
                    if(!validDomain||validMailbox===null){
                      return res.json({message:"Invalid email address"});
                      }
                }
                if (req.body.password.length < 6) {
                    return res.json({ message: 'Password length should be greater than 5 characters' })
                }
                else if (req.body.password != req.body.confirmpassword) {
                    return res.json({ message: 'Password doesn\'t match' });
                }
                bcrypt.hash(req.body.password, 10,async function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        var randotp=Math.floor(Math.random() * 899999 + 100000);
                        var mailOptions = {
                            from: process.env.secretmail,
                            to: req.body.email,
                            subject: "Verify your email",
                            html:`<h2>${req.body.name}! Thanks for registering on EdShare</h2>
                                    <h3>Please verify your account</h3>
                                 <h1 style="color:blue">OTP : ${randotp}</h2>`
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              return res.json("Wrong mail");
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          let newrandotp = randotp.toString();
                         
                          bcrypt.hash(newrandotp, 10,async function (err, otphash) {
                              
                            try {
                                if(req.files){

                              const  fileStr = req.files.data;
                                  
                                const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {
                                    upload_preset: 'edshare',
                                });
                                console.log(uploadResponse.url);

                                const user = {
                                    name: req.body.name,
                                    email:req.body.email,
                                    password: hash,
                                    qualification:req.body.qualification,
                                    bio:req.body.bio,
                                    emailotp:otphash,
                                    profileurl:uploadResponse.url
                                }
                                

                                const newUser = new User(user);
                                console.log("success");
                                newUser.save(err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        confirmationmail(user);
                                        return res.json({ message: 'Succesfully Register - Verify your account' })
                                    }
                                });
                            }
                            else{
                                
                                const user = {
                                    name: req.body.name,
                                    email:req.body.email,
                                    password: hash,
                                    qualification:req.body.qualification,
                                    bio:req.body.bio,
                                    emailotp:otphash
                                    
                                }
                                

                                const newUser = new User(user);
                                console.log("success");
                                newUser.save(err => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        confirmationmail(user);
                                        return res.json({ message: 'Succesfully Register - Verify your account' })
                                    }
                                });
                            }
                              }
                              catch(error){
                                  console.log(error);
                              }
                        
                    });
                    }
                });
            }
        }
    })
})

//get_user_details_by_email
app.get("/userdetails",async(req,res)=>{
    const email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            const userdetails={
                name:user.name,
                bio:user.bio,
                profileurl:user.profileurl,
                private_profile:user.private_profile,
                qualification:user.qualification
            }
            return res.send(userdetails);
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})

//edit email
app.put("/editemail",async(req,res)=>{
    const email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            bcrypt.compare(req.body.otp, user.emailotp,async function (err, result) {
                if (err) {
                    res.sendStatus(403)
                }
                if(result){
                    await User.findByIdAndUpdate(user._id,
                        {$set:{email:req.body.secemail}}, {safe: true, upsert: true, new : true});
                        return res.json({ message: 'Email Updated Successfully' })
                }
            else{
                return res.json({
                    message: "Incorrect OTP"
                })
            }
            });
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})
app.post("/sendotpsecemail",async(req,res)=>{
    const email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            var randotp=Math.floor(Math.random() * 899999 + 100000);
                        var mailOptions = {
                            from: process.env.secretmail,
                            to: req.body.secemail,
                            subject: "Change Email-EdShare",
                            html:`<h2>${user.name}! Change your email address</h2>
                                 <h1 style="color:blue">OTP : ${randotp}</h2>`
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              return res.json("Wrong mail");
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          let newrandotp = randotp.toString();
                         
                          bcrypt.hash(newrandotp, 10,async function (err, otphash) {
                          await User.findByIdAndUpdate(user._id,
                        {$set:{emailotp:otphash}}, {safe: true, upsert: true, new : true});
                        return res.json({ message: 'OTP sent' })
                          });
               
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})

//edituser
app.put("/edituser",async(req,res)=>{
    const email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            
            try {
                if(req.files){

              const  fileStr = req.files.data;
                  
                const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {
                    upload_preset: 'edshare',
                });
                console.log(uploadResponse.url);

                user.profileurl=req.body.uploadResponse.url;
                user.name=req.body.name;
                user.qualification=req.body.qualification;
                user.bio=req.body.bio;
                await user.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                       
                        return res.json({
                            message: 'Successfully updated'
                        })
                    }
                });
            }
            else{
                
                user.name=req.body.name;
                user.qualification=req.body.qualification;
                user.bio=req.body.bio;
                await user.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                       
                        return res.json({
                            message: 'Successfully updated'
                        })
                    }
                });
            }
              }
              catch(error){
                  console.log(error);
              }
               
            
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})

//deleteuser
app.delete("/deleteuser",async(req,res)=>{
    const email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            //console.log(user.docs);
            for (let i = 0; i < user.docs.length; i++) {
                await Doc.findByIdAndDelete(user.docs[i].toString());
              }
              await User.findByIdAndDelete(user._id.toString());
            return res.json({
                message: "User successfully deleted"
            })
            
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})
function confirmationmail(user){
    var mailOptions = {
        from: process.env.secretmail,
        to: process.env.secretmail,
        subject: "New User Registered",
        text: "Name :"+user.name
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

//checkotp
app.post('/checkotp',(req,res)=>{
    var otp=req.body.otp;
    var email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            bcrypt.compare(otp, user.emailotp,async function (err, result) {
                if (err) {
                    res.sendStatus(403)
                }
                if(result){
                await User.findByIdAndUpdate(user._id,
                    {$set:{isActive:true}}, {safe: true, upsert: true, new : true});
                  
                return res.json({
                    message: "OTP Verified"
                })
            }
            else{
                return res.json({
                    message: "Incorrect OTP"
                })
            }
            });
            
               
            
        }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})

//sendotp
app.post('/sendotp',async(req,res)=>{
    var email = req.body.email;
    User.findOne({ email: email })
        .then(async user =>{
            if(user){
                        var randotp=Math.floor(Math.random() * 899999 + 100000);
                        var mailOptions = {
                            from: process.env.secretmail,
                            to: req.body.email,
                            subject: "Forgot Password-EdShare",
                            html:`<h2>${user.name}! Reset your password</h2>
                                 <h1 style="color:blue">OTP : ${randotp}</h2>`
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              return res.json("Wrong mail");
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          let newrandotp = randotp.toString();
                          bcrypt.hash(newrandotp, 10,async function (err, otphash) {
                          await User.findByIdAndUpdate(user._id,
                        {$set:{emailotp:otphash}}, {safe: true, upsert: true, new : true});
                        return res.json({ message: 'OTP sent' })
                          });
               
            }
            else {
                res.json({
                    message: "User doesn't exist"
                })
            }
        })
})

//changepassword_by_oldpassword
app.post('/changepassword',(req,res)=>{
   
    var email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
            bcrypt.compare(req.body.oldpassword, user.password, function (err, result) {
                if (err) {
                    res.sendStatus(403)
                }
                if (result) {
                if (req.body.newpassword.length < 6) {
                    return res.json({ message: 'New Password length should be greater than 5 characters' })
                }
                else if (req.body.newpassword != req.body.confirmnewpassword) {
                    return res.json({ message: 'Password doesn\'t match' });
                }
                bcrypt.hash(req.body.newpassword, 10,async function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        await User.findByIdAndUpdate(user._id,
                            {$set:{password:hash}}, {safe: true, upsert: true, new : true});
                            return res.json({ message: 'Password Updated Successfully' })
                    }
                })
            }
            else {
                res.json({
                    message: 'Incorrect old password'
                })
            }
        })
            }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})

//resetpassword
app.post('/resetpassword',(req,res)=>{
   
    var email=req.body.email;
    User.findOne({ email: email })
    .then(async user =>{
        if(user){
           
                if (req.body.password.length < 6) {
                    return res.json({ message: 'Password length should be greater than 5 characters' })
                }
                else if (req.body.password != req.body.confirmpassword) {
                    return res.json({ message: 'Password doesn\'t match' });
                }
                bcrypt.hash(req.body.password, 10,async function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        await User.findByIdAndUpdate(user._id,
                            {$set:{password:hash}}, {safe: true, upsert: true, new : true});
                            return res.json({ message: 'Password Updated Successfully' })
                    }
                })
            }
        else {
         return res.json({
                message: "User doesn't exist"
            })
        }
})
})
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.secretmail,
      pass: process.env.secretpassword
    }
  });

//login
app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.sendStatus(403)
                    }
                    if (result) {
                        if(user.isActive===false)
                        {
                            res.json({
                                message: 'User is not verified.Verify your account using OTP'
                            })
                        }
                        else{
                        token = jwt.sign({ email: email }, SECRETKEY);
                        console.log("login");
                        
                        res.json({
                            message: 'login',
                            token
                        })
                    }
                    } else {
                        res.json({
                            message: 'Incorrect password'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'Incorrect email'
                })
            }
        })
})


//profilemode
app.post('/profilemode/:id',async(req, res) => {
    const{id}=req.params;
    //public = false
    //private = true
    User.findOne({ email: id })
    .then(async user =>{
        if(user){
            user.private_profile=req.body.profilemode;
            await user.save(err => {
                if (err) {
                    console.log(err);
                } else {
                   
                    return res.json({
                        message: 'Successfully updated'
                    })
                }
            });
        }
        else {
            res.json({
                message: "User doesn't exist"
            })
        }
    })
})

//uploadpdf
app.post('/uploadpdf/:id',async(req, res) => {
    const fileStr = req.files.newpdf;
    const title = req.body.title;
    const description = req.body.description;
    const mode=req.body.mode;
    const{id}=req.params;
        console.log(id); 
    const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {
        upload_preset: 'edshare',
    });
   
    console.log(uploadResponse.url);
    User.findOne({ email: id })
    .then(async user =>{
        if(user){
            const doc = {
                email:id,
                docurl: uploadResponse.url,
                title:title,
                description:description,
                mode:mode
            }
            
            const newDoc = new Doc(doc);
            console.log("success");
            await newDoc.save(err => {
                if (err) {
                    console.log(err);
                } 
            });
            user.docs.push(newDoc);
            await user.save(err => {
                if (err) {
                    console.log(err);
                } else {
                   
                    return res.json({
                        message: 'Successfully uploaded'
                    })
                }
            });
            
        }
        else {
            res.json({
                message: "User doesn't exist"
            })
        }
    })
  
})

//getallpdf
app.get("/getallpdf/:id",async(req,res)=>{
    const{id}=req.params;
    await User.findOne({'email':id}).populate('docs').exec(function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            if(result.docs)
            res.send(result.docs);
            else return res.json({message:'Oops!! You do not have any pdf'});
        }
    })
})

//updatepdf
app.put("/updatepdf/:id",async(req,res)=>{
    const fileStr = req.files.newpdf;
    const title = req.body.title;
    const description = req.body.description;
    const mode=req.body.mode;
    const pdfid=req.body.pdfid;
    const{id}=req.params;
        console.log(id); 
        const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {
            upload_preset: 'edshare',
        });
       
        const doc = {
            email:id,
            docurl: uploadResponse.url,
            title:title,
            description:description,
            mode:mode
        }
        await Doc.findByIdAndUpdate(pdfid,{...doc});
        return res.json({
            message: 'Successfully updated'
        })
})

//deletepdf
app.delete("/deletepdf/:userid/:pdfid",async(req,res)=>{
    
    const{pdfid,userid}=req.params;
        
    await Doc.findByIdAndDelete(pdfid);
    await User.findOneAndUpdate(
        { "email" : userid },
            { $pull: { "docs": pdfid } },
            {safe: true, upsert: true, new : true}
       )
    return res.json({
        message: 'Successfully deleted'
    })
})

//savedoc
app.post("/savedoc/:userid/:pdfid",async(req,res)=>{
    const{pdfid,userid}=req.params;
    await User.findOneAndUpdate(
        { "email" : userid },
            { $push: { "saveddocs": pdfid } },
            {safe: true, upsert: true, new : true}
       )
    return res.json({
        message: 'Successfully saved'
    })
})

//delete saved doc
app.delete("/deletesavedoc/:userid/:pdfid",async(req,res)=>{
    const{pdfid,userid}=req.params;
    await User.findOneAndUpdate(
        { "email" : userid },
            { $pull: { "saveddocs": pdfid } },
            {safe: true, upsert: true, new : true}
       )
    return res.json({
        message: 'Successfully removed'
    })
})

//PORT
const port=process.env.PORT || 8000;

  app.listen(port,()=>{
      console.log(`Running on port ${port}`);
  })