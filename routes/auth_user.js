const express = require("express")
const router = express.Router()

const User = require("../models/userModels");

//getting info about user
router.get('/:email', async (req, res) => {
    const { email } = req.params;
    await User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(user);
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    })
});

//updating user info
router.patch('/:email', async (req, res) => {
    const { email } = req.params;
    const { description, gender, profilePic, birthDate } = req.body;
    await User.findOne({ email }).then(async (user) => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (profilePic) {
            user.profilePic = profilePic;
        }

        if (description) {
            user.description = description;
        }

        if (gender) {
            user.gender = gender;
        }

        if (birthDate) {
            user.birth = birthDate;
        }

        await user.save();
        res.status(201).json({ message: "updated successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    })
});

module.exports= router
