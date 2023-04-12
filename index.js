const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const flightsdata = require("./Routes/flights")
require("dotenv").config();

// database connection
connection();


// middlewares
app.use(express.json());
app.use(cors());



// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get('/data',(req,res) =>{
    res.json(flightsdata).status(200);
    res.end();
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

//1H9O10oymcbPphS1
//