const express = require("express");

const app = express();

app.use(express.json());

function usernameValidator(username, password) {
    if(username != "Ashish" && password != "pass") {
        return false;
    }
    return true;
}

function kidneyValidator(kidneyId) {
    if(kidneyId != 1 && kidneyId != 2) {
        return false;
    }
    return true;
}

app.get("/health-checkup", function(req, res){
    const kidneyId = req.query.kideyId;

    if(!usernameValidator(req.query.username, req.query.password)) {
        res.status(403).json({
            msg: "User doesn't exist",
        });
        return;
    }

    if(!kidneyValidator(kidneyId)) {
        res.status(411).json({
            msg: "wrong Inputs",
        });
        return;
    }

    res.send("Your heart is healthy");
});

app.put("/replace-kidney", function(req, res) {
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    if(!usernameValidator(username, password)) {
        res.status(403).json({
            msg: "User doesn't exist",
        });
        return;
    }

    if(!kidneyValidator(kidneyId)) {
        res.status(411).json({
            msg: "wrong inputs",
        });
        return;
}
});


/*  ----- more cleaner way to use middleware 
what is middleware?
validating something before router proceding */

function userMiddleware(req, res, next) { 
    const  username = req.headers.username;;
    const password =req.headers.password;
    if(username != "Ashish" && password != "pass") {
        res.status(403).json({
            msg: "Incorrect inputs"
        });
    } else {
        next();
    }
}

function kidneyMiddleware(req, res, next) {
    const kidneyId = req.query.kidneyId;

    if(kidneyId != 1 && kidneyId != 2) {
        res.status(403).json({
            msg: "incorrect inputs",
        });
    } else {
        next();
    }
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res) {

    res.send("Your heart is healthy");
});

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res) {
    res.send("Your kidney is healthy");
});

app.get("/heart-check", userMiddleware, function(req, res) { 
    res.send("Your Heart is healthy");
});