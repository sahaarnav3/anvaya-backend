const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const { initialiseDatabase } = require("./db/db.connect");

const Lead = require("./models/lead.model");
const Comment = require("./models/comment.model");
const SalesAgent = require("./models/salesAgent.model");

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
initialiseDatabase();

app.get("/", (req, res) => {
  res.send("<h1>Hi, Welcome to homepage of this Backend App.</h1>");
});

// Route to create a new lead.
app.post("/leads", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    if (!req.body.name)
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });

    if (!req.body.source)
      return res
        .status(400)
        .json({ error: "Invalid input: 'source' is required." });

    if (!req.body.salesAgent)
      return res
        .status(400)
        .json({ error: "Invalid input: 'SalesAgentID' is required." });
    else {
      try {
        const objectId = new mongoose.Types.ObjectId(req.body.salesAgent); // this deprecation message is not correct here. (Correct only in case when you're trying to convert a number into ObjectId).
        const salesAgentResponse = await SalesAgent.findById(objectId);
        if (!salesAgentResponse)
          return res.status(404).json({
            error: `Sales agent with ID '${req.body.salesAgent}' not found.`,
          });
      } catch (error) {
        console.error("Invalid ObjectId string:", error.message);
        return res.status(400).json({
          error: "Invalid input: 'SalesAgentId' is not a valid ID format.",
        });
      }
    }
    if (!req.body.status)
      return res
        .status(400)
        .json({ error: "Invalid input: 'status' is required." });

    if (!req.body.timeToClose || req.body.timeToClose < 1)
      return res.status(400).json({
        error:
          "Invalid input: 'time to close' is required and should be a positive integer.",
      });

    if (!req.body.priority)
      return res
        .status(400)
        .json({ error: "Invalid input: 'priority' is required." });

    const saveLead = await lead.save();
    res.status(200).json(saveLead);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to get all leads. Or to get the leads according to the filters.
// /leads?salesAgent=1hjh123hjh1j2h3&status=New -- this is called as query parameters. Can be accessed by req.query
// /leads/:id -- this is called as Path Variable. Can be accessed by req.params
app.get("/leads", async (req, res) => {
  try {
    const query = {};
    if (req.query.salesAgent) {
      try {
        const objectId = new mongoose.Types.ObjectId(req.query.salesAgent);
        const salesAgentResponse = await SalesAgent.findById(objectId);
        if (!salesAgentResponse)
          return res.status(404).json({
            error: `Sales agent with ID '${req.body.salesAgent}' not found.`,
          });
        query.salesAgent = req.query.salesAgent;
      } catch (error) {
        console.error("Invalid ObjectId string:", error.message);
        return res.status(400).json({
          error: "Invalid input: 'SalesAgentId' is not a valid ID format.",
        });
      }
    }
    if (req.query.status) {
      const tempStatus = req.query.status;
      if (
        tempStatus == "New" ||
        tempStatus == "Contacted" ||
        tempStatus == "Qualified" ||
        tempStatus == "Proposal Sent" ||
        tempStatus == "Closed"
      )
        query.status = tempStatus;
      else
        return res.status(400).json({
          error:
            "Invalid input: 'status' must be one of ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].",
        });
    }
    if (req.query.tags) query.tags = req.query.tags;
    if (req.query.source) {
      const tempSource = req.query.source;
      if (
        tempSource == "Website" ||
        tempSource == "Referral" ||
        tempSource == "Cold Call" ||
        tempSource == "Advertisement" ||
        tempSource == "Email" ||
        tempSource == "Other"
      )
        query.source = tempSource;
      else
        return res.status(400).json({
          error:
            "Invalid input: 'source' must be one of ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'].",
        });
    }
    const leadResponse = await Lead.find(query)
      .populate("salesAgent", "name")
      .exec();
    if (!leadResponse)
      return res.status(404).json({
        error:
          "Lead with given filters not found. Please try with different filter values.",
      });
    return res.status(200).json(leadResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

//Route to update Leads
app.put("/leads/:id", async (req, res) => {
  try {
    if (!req.body.name)
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });

    if (!req.body.source)
      return res
        .status(400)
        .json({ error: "Invalid input: 'source' is required." });

    if (!req.body.salesAgent)
      return res
        .status(400)
        .json({ error: "Invalid input: 'SalesAgentID' is required." });
    else {
      try {
        const objectId = new mongoose.Types.ObjectId(req.body.salesAgent); // this deprecation message is not correct here. (Correct only in case when you're trying to convert a number into ObjectId).
        const salesAgentResponse = await SalesAgent.findById(objectId);
        if (!salesAgentResponse)
          return res.status(404).json({
            error: `Sales agent with ID '${req.body.salesAgent}' not found.`,
          });
      } catch (error) {
        console.error("Invalid ObjectId string:", error.message);
        return res.status(400).json({
          error: "Invalid input: 'SalesAgentId' is not a valid ID format.",
        });
      }
    }
    if (!req.body.status)
      return res
        .status(400)
        .json({ error: "Invalid input: 'status' is required." });

    if (!req.body.timeToClose || req.body.timeToClose < 1)
      return res.status(400).json({
        error:
          "Invalid input: 'time to close' is required and should be a positive integer.",
      });

    if (!req.body.priority)
      return res
        .status(400)
        .json({ error: "Invalid input: 'priority' is required." });

    const leadResponse = await Lead.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('salesAgent', 'name').exec();
    if(!leadResponse)
      return res.status(404).json({error: `Lead with ID '${req.params.id}' not found.`});
    else
      return res.status(200).json(leadResponse);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

// Route to create a sales agent.
app.post("/agents", async (req, res) => {
  try {
    const salesAgent = new SalesAgent(req.body);

    if (!req.body.name)
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });
    else if (!req.body.email)
      return res
        .status(400)
        .json({ error: "Invalid input: 'email' is required." });
    else if (
      !(
        req.body.email.indexOf("@") > -1 &&
        req.body.email.indexOf(".com") > -1 &&
        req.body.email.indexOf(".com") > req.body.email.indexOf("@")
      )
    )
      return res.status(400).json({
        error: "Invalid input: 'email' must be a valid email address.",
      });

    const saveSalesAgent = await salesAgent.save();
    if (!saveSalesAgent)
      return res.status(409).json({
        error: `Sales agent with email '${req.body.email}' couldn't be created. Please try again.`,
      });
    return res.status(200).json(saveSalesAgent);
  } catch (err) {
    if (err.code == 11000)
      return res.status(409).json({
        error: `Sales agent with email '${req.body.email}' already exists.`,
      });
    console.log("Error in catch block -- ", err);
    res.status(500).json({
      error:
        "Some error occurred with the request itself. Please check logs and try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
