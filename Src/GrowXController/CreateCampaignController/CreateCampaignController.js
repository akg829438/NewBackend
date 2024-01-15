
//    Create Campaign Controller


const AdvertiserModal = require("../../GrowXModals/AllAuthModal/AdvertiserModal");
const AdvanceSettingsModal = require("../../GrowXModals/CreateCampaignModal/AdvanceSettings")
const CappingAndLimitsModal = require("../../GrowXModals/CreateCampaignModal/CappingAndLimitsModal")
const CreateCampaignModal = require("../../GrowXModals/CreateCampaignModal/CreateCampaignModal")
const TargetingModal = require("../../GrowXModals/CreateCampaignModal/TargetingModal")
//    Create Campaign Controller

exports.CreateCampaign = async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const userId = req.user.id;
    console.log(userId)


    const data_come = {
      campaignName: data.campaignName,
      connectionType: data.connectionType,
      pricingType: data.pricingType,
      adUnitCategory: data.adUnitCategory,
      trafficType: data.trafficType,
      landingUrl: data.landingUrl,
      deviceFormat: data.deviceFormat,
      createcampaign_images: req.files?.map(ele => ele.filename),
      countries: data.countries,
      totalBudget: data.totalBudget,
      dailyBudget: data.dailyBudget,
      afterVerification: data.afterVerification,
      
    };

    // Check if the user already has a campaign
    const userCampaign = await CreateCampaignModal.findOne({ user: userId });

    if (userCampaign) {
      // If the user already has a campaign, push the new campaign to the array
      userCampaign.campaigns.push(data_come);
      await userCampaign.save();

      res.json({
        status: 'success',
        message: 'Create Campaign successfully and added to existing user campaigns.',
        data: userCampaign,
      });
    } else {
      // If the user doesn't have a campaign, create a new one
      const newCampaign = await CreateCampaignModal.create({
        user: userId,
        campaigns: [data_come],
      });

      res.json({
        status: 'success',
        message: 'Create Campaign successfully.',
        data: newCampaign,
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {};
    resError.status = 'failed';
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError);
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    // Fetch all campaigns and populate user details
    const userCampaigns = await CreateCampaignModal.find({})
      .populate({
        path: 'user',
        model: AdvertiserModal,
        select: 'fullName userName email company country messenger messengerDetails',
      })
      .lean(); // Adding lean() to convert Mongoose documents to plain JavaScript objects

    if (userCampaigns.length > 0) {
      res.json({
        status: 'success',
        message: 'Get Campaigns successfully.',
        data: userCampaigns,
      });
    } else {
      res.json({
        status: 'fail',
        message: 'No Campaigns Found',
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: 'failed',
      message: 'Error fetching campaigns.',
    };

    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};


exports.getCampaignbyUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    // Ensure userId exists
    if (!userId) {
      return res.json({
        status: 'fail',
        message: 'User ID is missing in the request.',
      });
    }

    const userCampaign = await CreateCampaignModal.findOne({ user: userId })
      .populate({
        path: 'user',
        model: AdvertiserModal,
        select: 'fullName userName email company country messenger messengerDetails',
      })
      .lean(); // Use lean() to get a plain JavaScript object

    if (userCampaign) {
      res.json({
        status: 'success',
        message: 'Get Campaign successfully.',
        data: userCampaign,
      });
    } else {
      res.json({
        status: 'fail',
        message: 'No Campaign Found',
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: 'failed',
      message: 'Error fetching user campaign.',
    };

    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};
exports.deleteCampaignUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaignId = req.params.id;
    console.log(userId)
    console.log(campaignId)
    // Ensure userId exists
    if (!userId) {
      return res.json({
        status: 'fail',
        message: 'User ID is missing in the request.',
      });
    }

    // Delete the campaign
    const deletedCampaign = await CreateCampaignModal.findOneAndDelete({
      _id: campaignId,
      user: userId,
    }).lean();

    if (deletedCampaign) {
      res.json({
        status: 'success',
        message: 'Campaign deleted successfully.',
        data: deletedCampaign,
      });
    } else {
      res.json({
        status: 'fail',
        message: 'Campaign not found or could not be deleted.',
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: 'failed',
      message: 'Error deleting campaign.',
    };

    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
}


exports.updateCampaign = async (req, res) => {
  try{
    const campaignId = req.params.id;

    console.log(campaignId)
    const data = req.body;
    console.log(data)
    const data_come = {
      campaignName: data.campaignName,
      connectionType: data.connectionType,
      pricingType: data.pricingType,
      adUnitCategory: data.adUnitCategory,
      trafficType: data.trafficType,
      landingUrl: data.landingUrl,
      deviceFormat: data.deviceFormat,
      createcampaign_images: req.files?.map(ele => ele.filename),
      countries: data.countries,
      totalBudget: data.totalBudget,
      dailyBudget: data.dailyBudget,
      afterVerification: data.afterVerification,
    };
    // Update the campaign

    const updatedCampaign = await CreateCampaignModal.findByIdAndUpdate(
      campaignId,
      data_come,
      { new: true }
    ).lean();

    if (updatedCampaign) {
      res.json({
        status: 'success',
        message: 'Campaign updated successfully.',
        data: updatedCampaign,
      });
    }
    else {
      res.json({
        status: 'fail',
        message: 'Campaign not found or could not be updated.',
      });
    }

  } catch (error) {
    console.error(error);
    const resError = {};
    resError.status = 'failed';
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError);

  }
};





exports.Targeting = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const data_come = {
      targetingType: data.targetingType,
    }

    const ress = await TargetingModal.create(data_come)

    console.log(`yours Targeting Data is ${ress}`)
    if (ress) {
      res.json({
        status: "success",
        message: "Create Campaign sucessfully",
        data: ress,
      })
    }
    else {
      res.json({
        status: "fail",
      })
    }
  } catch (error) {
    console.log(error)
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError)
  }
}
    






exports.AdvanceSettings = async (req, res) => {
  try {
    const data = req.body;
    console.log(`your advacne sewtting data is ${data}`)
    const data_come = {
      connectionType: data.connectionType,
      placementValue: data.placementValue,
      ipRangeTargeting: data.ipRangeTargeting,
      placements: data.placements,
      countryCodes: data.countryCodes,
      price: data.price,
    }

    const ress = await AdvanceSettingsModal.create(data_come)

    console.log(`yours Targeting Data is ${ress}`)
    if (ress) {
      res.json({
        status: "success",
        message: "Create Campaign sucessfully",
        data: ress,
      })
    }
    else {
      res.json({
        status: "fail",
      })
    }
  } catch (error) {
    console.log(error)
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError)
  }
}


exports.CappingAndLimits = async (req, res) => {
  try {
    const data = req.body;
    const data_come = {
      impressions : data.impressions,
      period : data.period,
      periodType : data.periodType,
      totalLimits : data.totalLimits,
      dailyLimits : data.dailyLimits,
      hourlyLimits : data.hourlyLimits,
      totalBudget : data.totalBudget,
      dailyBudget : data.dailyBudget,
      hourlyBudget : data.hourlyBudget,
    }

    const ress = await CappingAndLimitsModal.create(data_come)

    console.log(`yours Targeting Data is ${ress}`)
    if (ress) {
      res.json({
        status: "success",
        message: "Create Campaign sucessfully",
        data: ress,
      })
    }
    else {
      res.json({
        status: "fail",
      })
    }
  } catch (error) {
    console.log(error)
    const resError = {}
    resError.status = "failed"
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError)
  }
}



// exports.setCampaignImages = async (req, res) => {
//   const createCampaign_id = req.params.createCampaign_id
//   console.log(createCampaign_id)
//   const updateData = {
//     createCampaign_images: req.files.map(ele => ele.filename)
//   }
//   const update_mongo = await CreateCampaignModal.updateOne({ _id: createCampaign_id }, updateData)
//   if (update_mongo) {
//     res.json({
//       status: "success",
//       message: "Campaig1 Image Images Upload Successfully"
//     })
//   }
// }


