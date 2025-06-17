const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const {initialiseDatabase} = require('./db/db.connect');

const Lead = require('./models/lead.model');
const Comment = require('./models/comment.model');
const SalesAgent = require('./models/salesAgent.model');

const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(express.json());
initialiseDatabase();

app.get("/", (req, res) => {
    res.send("<h1>Hi, Welcome to homepage of this Backend App.</h1>")
});

// Route to create a new lead.
// app.post("/leads", async(req, res) => {
//     try {
//         const lead = new Lead(req.body);
//         if(!req.body.name)
//             return res.status(400).json({ error: "Invalid input: 'name' is required."})
//         const saveLead = await lead.save();

//     } catch(err) {
//         console.log(err);
//         res.status(500).json({
//             error: "Some error occurred with the request itself. Please check logs and try again."
//         })
//     }
// });

// Route to create a sales agent.
app.post("/agents", async(req, res) => {
    try{
        const salesAgent = new SalesAgent(req.body);

        if(!req.body.name)
            return res.status(400).json({ error: "Invalid input: 'name' is required."});
        else if(!req.body.email)
            return res.status(400).json({ error: "Invalid input: 'email' is required."});
        else if(!(req.body.email.indexOf('@') > -1 && req.body.email.indexOf('.com') > -1 && (req.body.email.indexOf('.com') > req.body.email.indexOf('@'))))
            return res.status(400).json({ error: "Invalid input: 'email' must be a valid email address."});

        const saveSalesAgent = await salesAgent.save();
        if(!saveSalesAgent)
            return res.status(409).json({ error: `Sales agent with email '${req.body.email}' couldn't be created. Please try again.`});
        return res.status(200).json(saveSalesAgent);
    } catch(err) {
        if(err.code == 11000)
            return res.status(409).json({ error: `Sales agent with email '${req.body.email}' already exists.`});
        console.log("Error in catch block -- ", err);
        res.status(500).json({
            error: "Some error occurred with the request itself. Please check logs and try again."
        })
    }
})



app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})