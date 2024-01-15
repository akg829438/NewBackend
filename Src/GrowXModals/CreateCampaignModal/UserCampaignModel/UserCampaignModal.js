const mongoose = require("mongoose")
const Collection = require("../../../GrowXConfig/Collection")
require("../../../GrowXConfig/GrowX_db")



const userCampaignSchema = new mongoose.Schema({  
     items: [
    { 
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campaign',
      },
      quantity: Number,

    },
    
  ],
  uaser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
   
 
    
})

const UserCampaignModel = mongoose.model(Collection.UserCampaign,userCampaignSchema)



module.exports = UserCampaignModel

