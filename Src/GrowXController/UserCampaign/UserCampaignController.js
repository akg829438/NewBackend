const UserCampaignModel = require("../../GrowXModals/CreateCampaignModal/UserCampaignModel/UserCampaignModal");



exports.UserCampaign= async (req, res) => {
    try {

        const { campaignId, quantity, campaignType } = req.body;
        console.log(data)
        
        const cart = await UserCampaignModel.findOne({ user: req.userId }); 
        
        const existingItem = cart.items.find(item => item.campaign.toString() === campaignId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ campaign: campaignId,  quantity: quantity,campaignType:campaignType });
        }
    
        await cart.save();
        res.json({ success: true, message: 'Campaign added to cart successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}
