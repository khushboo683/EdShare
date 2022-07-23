const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const docSchema=new Schema({
    email:String,
    docurl:String,
    title:String,
    description:String,
    mode:String
});

module.exports = mongoose.model('Doc',docSchema);