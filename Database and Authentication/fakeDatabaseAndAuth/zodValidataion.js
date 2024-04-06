const express = require("express");
const z = require("zod");

const app = express();
const schema = z.array(z.number());

app.use(express.json());

/* 
{
    email: String => email
    password: altleast 8 letters  
    country: "IN" | "US"
} */

const schema1 = z.object({
    email: z.string(),
    password: z.string(),
    country: z.literal("IN").or(z.literal("US")),
    kidneys: z.array(z.number())
})

app.post("/health-checkup", function(req, res) {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    
    if(!response.success) {
        res.status(411).json({
            msg: "Invalid inputs"
        })
    } else {
        res.send({
            response
        })
    }
});

//global catches
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})          