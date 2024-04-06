const express = require("express");
 
const app = express();

app.use(express.json());

app.get("/health-checkup", function(req, res) {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(username != "Ashish" && password != "pass") {
        res.status(403).json({
            msg: "User doesn't exsit",
        }); 
        return;
    }

    if(kidneyId != 1 && kidneyId != 2)  {
        res.status(411).json({
            msg: "Wrong Inputs",        });
        return;
    }

    res.send("Your heart is healthly");
})

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
})