const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [ true, "Missing username"]
    },
    email:{
        type:String,
        required: [ true, "Missing email"],
        unique: [true, "Email already in use"]
    },
    password:{
        type:String,
        required: [ true, "Missing password"]
    },
}, {
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);