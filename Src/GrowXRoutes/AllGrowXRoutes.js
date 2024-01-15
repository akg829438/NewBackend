const express = require('express');
const { AdvertiserLogin, AdvertiserSignup, PublisherLogin, PublisherSignup, AffiliateLogin, AffiliateSignup } = require('../GrowXController/AuthController/AuthController');
const { CreateCampaign, CappingAndLimits, AdvanceSettings, Targeting, getCampaignbyUser, getAllCampaigns, updateCampaign, deleteCampaignUser } = require('../GrowXController/CreateCampaignController/CreateCampaignController');
const { campaignImagesUpload } = require('../GrowXMiddleware/Upload');
const { UserCampaign } = require('../GrowXController/UserCampaign/UserCampaignController');
const { authmidleware } = require('../GrowXMiddleware/AuthMiddleWare');


const GrowXrouter = express.Router()

// Advertiser Auth 
GrowXrouter.post('/advertiserlogin', AdvertiserLogin)
GrowXrouter.post('/advertisersignup', AdvertiserSignup)
// Advertiser Auth 

// Publisher Auth 
GrowXrouter.post('/publisherlogin', PublisherLogin)
GrowXrouter.post('/publishersignup', PublisherSignup)
// Publisher Auth 

// Affiliate Auth 
GrowXrouter.post('/affiliatelogin', AffiliateLogin)
GrowXrouter.post('/affiliatesignup', AffiliateSignup)
// Affiliate Auth 

GrowXrouter.get('/getcampaignbyuser',authmidleware, getCampaignbyUser)
GrowXrouter.get('/getallcampaigns', getAllCampaigns)
GrowXrouter.delete('/deletecampaigns/:id',authmidleware, deleteCampaignUser)
GrowXrouter.put('/updatecampaigns/:id',authmidleware, updateCampaign)

// Create Campaign Routes 
GrowXrouter.post('/createcampaign',authmidleware,campaignImagesUpload, CreateCampaign)
GrowXrouter.post('/targetingCampaign', Targeting)

GrowXrouter.post('/advancesettings', AdvanceSettings)
GrowXrouter.post('/cappingandlimits', CappingAndLimits)
GrowXrouter.post('/usercampaign',UserCampaign)
// addToCart 

module.exports = GrowXrouter;