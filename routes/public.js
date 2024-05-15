const express = require("express")
const router = express.Router()
const QRCode = require('qrcode');

const User = require("../models/userModels");

//registering user
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
      // generate QR code image and encode email as data URL
    const dataUrl = await QRCode.toDataURL(email);

    // create new user with email, password, and QR code image
    await User.create({ email: email, password: password, qrImage: dataUrl }).then(() => {
        res.status(201).json({ message: "User registered successfully" });
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    })
})

module.exports= router