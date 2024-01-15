const express = require('express')
const app = express()
const cors = require('cors')
const GrowXrouter = require('./Src/GrowXRoutes/AllGrowXRoutes')
require("dotenv").config()



app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cors())

app.use("/auth",GrowXrouter)
app.use("/createcampaign",GrowXrouter)
app.use("/targeting",GrowXrouter)
app.use("/advancesettings",GrowXrouter)
app.use("/cappingandlimits",GrowXrouter)
  

 


module.exports = app;