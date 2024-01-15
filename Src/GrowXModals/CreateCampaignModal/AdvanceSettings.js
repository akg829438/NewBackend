const mongoose = require("mongoose")
require("../../GrowXConfig/GrowX_db")
const Collection=require("../../GrowXConfig/Collection")

const AdvanceSettingsModalSchema = new mongoose.Schema({
    connectionType:{type:String,required:[true," Connection Type is required field"]},
    placementValue:{type:String,required:[true," Placement Value is required field"]},
    ipRangeTargeting:{type:String,required:[true," IP Range Targeting is required field"]},
    placements:{type:String,required:[true," Placement is required field"]},
    countryCodes:{type:String,required:[true," Country Codes is required field"]},
    price:{type:String,required:[true," price is required field"]},

},
{timestamps:true}
)

const AdvanceSettingsModal = mongoose.model(Collection.AdvanceSettings,AdvanceSettingsModalSchema)

module.exports = AdvanceSettingsModal;

