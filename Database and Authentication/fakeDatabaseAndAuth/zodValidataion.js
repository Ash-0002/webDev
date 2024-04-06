const express = require("express");

const app = express();

app.use(express.json());

app.post("/health-checkup", function(req, res) {
    const kidneys = req.body.kidneys;

    res.send("You have" + kidneys.length + " kidneys");
});

app.use(function(err, req, res, next){
    res.json({
        msg: "Sorry something is up with our server"
    })
})


//global catches
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})