const mongoose = require("mongoose")
const fs = require('fs');

// defining the path of the default profile picture
const imagePath = './assets/defaultPic.jpeg';

// reading the image file synchronously and storing it in a buffer
const imageBuffer = fs.readFileSync(imagePath);

// converting the image buffer to a base64 string
const imageString = imageBuffer.toString('base64');

// creating a data URL for the image by combining the base64 string with the image format
const imageBase64 = `data:image/jpeg;base64,${imageString}`;

// defining the schema for the user model
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        default: "GoogleAuthenticatedUser@912",
    },
    profilePic:{
        type:String,
        default: imageBase64
    },
    qrImage:{
        type:String
    },
    description:{
        type:String,
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    birth:{
        type:String,
        default:null
    }
})

// creating the user model with the defined schema
const User = mongoose.model("user",userSchema);


// exporting the user model
module.exports = User;