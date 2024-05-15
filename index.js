require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const admin = require("./config/firebase-config")
const publicRoutes = require("./routes/public")
const userRoutes = require("./routes/auth_user")

//connect to database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to database");
}).catch((error) => {
    console.log(error);
})

//middleware
app.use(cors({
    origin: ["http://localhost:3000"]
}))

// parse JSON request bodies up to 50MB in size
app.use(bodyParser.json({ limit: '50mb' }));

// parse URL-encoded request bodies up to 50MB in size
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse JSON request bodies
app.use(express.json());

// verify authentication token for all requests to /user/*
app.use("/user/*", async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        await admin.auth().verifyIdToken(token).then((decodVal) => {
            if (decodVal) {
                next();
            }
            else {
                res.status(401).json({ message: "unauthorized user" })
            }
        }).catch((error) => {
            res.status(400).json({ error: error.message })
        })
    }
    catch (error) {
        res.status(401).json({ error:error.message })
    }

});

//routes
app.use("/",publicRoutes);
app.use("/user",userRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`server started at port ${process.env.PORT || 4000}`)
})
