const mongoose = require("mongoose")
require("../../GrowXConfig/GrowX_db")
const Collection=require("../../GrowXConfig/Collection")
const AdvanceSettingsModal = require("./AdvanceSettings")

const TargetingModalSchema = new mongoose.Schema({
    targetingType:{type:String,required:[true," Targeting Type is required field"]},
},
{timestamps:true}
)

const TargetingModal = mongoose.model(Collection.Targeting,TargetingModalSchema)

module.exports = TargetingModal;

