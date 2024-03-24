const express = require("express");
const jwt  = require("jsonwebtoken");
const secret = "happycoding"

const app = express();

app.use(express.json());

const ALL_USER = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "Harkirat singh"
    },
    {
        username: "rashish1313@gmail.com",
        password: "1234",
        name: "Ashish Rajput"
    },
    {
        username: "pooja@gmail.com",
        password: "12345",
        name: "Pooja thakur"
    },
];

function userExists(username, password) {
    return ALL_USER.find((user) => user.username == username && user.password == password)
}

app.post("/signup", function(req, res){
    console.log("here"); // Ensure this line is executed upon hitting the /signup route
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) { 
        return res.status(403).json({
            msg: "User doesn't exist in our db memory",
        })
    }

    var token = jwt.sign({ username: username}, secret);
    return res.json({
        token,
        success: true,
        msg:"Signed up successfully!"
    })
});

app.get("/users", function(req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, secret);
        const username = decoded.username;
    } catch (error) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
