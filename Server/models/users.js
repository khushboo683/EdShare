const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Doc=require('./docs');

const userSchema=new Schema({
    email:String,
    name:String,
    password:String,
    qualification:String,
    bio:String,
    emailotp:String,
    isActive:{
        type:Boolean,
        default:false
    },
    profileurl:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    },
    private_profile:{
        type:Boolean,
        default:false
    },
    docs:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:'Doc'
    }],
    saveddocs:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:'Doc'
    }]
    
});

module.exports = mongoose.model('User',userSchema);