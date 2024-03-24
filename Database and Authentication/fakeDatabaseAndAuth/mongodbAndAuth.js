const express = require("express");
const jwt = require("jsonwebtoken");
const secret = "happyCoding";
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.abeguul.mongodb.net/userappnew")

const User = mongoose.model("User", {
    name: String,
    username: String,
    password: String,
})    

app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username });
    console.log(existingUser);

    if(existingUser) {
        return res.status(400).send("Username already exists");
    }    

    
    const user = new User({
        name: name,
        email: username,
        password: password,
    });    
    
    user.save();

    var token = jwt.sign({ username: username }, secret);
    return res.json({
        token,
        success: true,
        msg: "Signed up successfully!"
    })
});

app.get("/users", async function(req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, secret);
        const username = decoded.username;
        
        // Retrieve all users from MongoDB
        const users = await User.find();
        
        // Send the users data as JSON response
        res.json({
            users: users
        });
    } catch (error) {
        return res.status(403).json({
            msg: "Invalid Token",
        });
    }
});


app.listen(3000, function() { 
    console.log("Serve is running on port 3000")
})
