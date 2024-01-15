const mongoose = require("mongoose");
require("../../GrowXConfig/GrowX_db");
const Collection = require("../../GrowXConfig/Collection");
const { AdvertiserLogin } = require("../../GrowXController/AuthController/AuthController");

const CampaignSchema = new mongoose.Schema({
  campaignName: { type: String },
  connectionType: { type: String },
  pricingType: { type: String },
  adUnitCategory: { type: String },
  trafficType: { type: String },
  landingUrl: { type: String },
  deviceFormat: { type: String },
  countries: { type: String },
  totalBudget: { type: String },
  dailyBudget: { type: String },
  afterVerification: { type: String },
  createcampaign_images: [{ type: String }],
}, { timestamps: true });

const CreateCampaignSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdvertiserModal' },
  campaigns: [CampaignSchema],
}, { timestamps: true });

const CreateCampaignModal = mongoose.model(Collection.CreateCampaign, CreateCampaignSchema);

module.exports = CreateCampaignModal;