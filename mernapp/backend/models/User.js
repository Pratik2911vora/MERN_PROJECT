const mongoose = require ('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: 'Please enter your name',
    trim: true
    },
    location:{
        type:String,
        required: 'Please enter your name',
    trim: true
    },
    email:{
        type:String,
        required: 'Please enter your name',
    trim: true
    },
    password:{
        type:String,
        required: 'Please enter your name',
    trim: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    
})
module.exports =mongoose.model('user',UserSchema)