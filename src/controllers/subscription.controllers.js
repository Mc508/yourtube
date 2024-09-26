import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
	const { channelId } = req.params;
    if(!channelId){
        throw new ApiError(400, "Channel id is required");
    }
    const subscription = await Subscription.create({
      subscriber : req.user._id,
      channel: channelId
    })
    return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Subscription created successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
	const { channelId } = req.params;
    if(!channelId){
        throw new ApiError(400, "Channel id is required");
    }
    const subscription = await Subscription.findById(channelId,{
        subscription
    }).countDocuments()
    return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Subscription created successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
	const { subscriberId } = req.params;
    if(!subscriberId){
        throw new ApiError(400, "Subscriber id is required");
    }
    const subscription = await Subscription.find({
        subscriber: subscriberId
    })
    return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Subscription created successfully"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
