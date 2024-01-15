const mongoose = require("mongoose")
require("../../GrowXConfig/GrowX_db")
const Collection = require("../../GrowXConfig/Collection")
// const { getPasswordHash } = require("../../GrowXUtils/GrowXUtils")


const CappingAndLimitsSchema = new mongoose.Schema({

    impressions: { type: String, required: [true, "impressions is required field"] },
    period: { type: String, required: [true, "period is required field"] },
    periodType: { type: String, required: [true, "periodType is required field"] },
    totalLimits: { type: String, required: [true, "totalLimits is required field"] },
    dailyLimits: { type: String, required: [true, "dailyLimits is required field"] },
    hourlyLimits: { type: String, required: [true, "hourlyLimits is required field"] },
    totalBudget: { type: String, required: [true, "totalBudget is required field"] },
    dailyBudget: { type: String, required: [true, "dailyBudget is required field"] },
    hourlyBudget: { type: String, required: [true, "hourlyBudget is required field"] },


},
    { timestamps: true }
)

const CappingAndLimitsModal = mongoose.model(Collection.CappingsAndLimits, CappingAndLimitsSchema)

module.exports = CappingAndLimitsModal;

