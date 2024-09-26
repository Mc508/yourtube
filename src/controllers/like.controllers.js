import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";


const getLikedVideos = asyncHandler(async (req, res) => {
    const videos = await Like.find({ owner: req.user._id });
    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Liked videos retrieved successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const commentId = req.params["commentId"]
    if(!commentId){
        throw new ApiError(400, "Comment id is required")
    }
    const comment = await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment liked successfully"))
})

const toggleVideoLike = asyncHandler(async (req, res) => {
    const videoId = req.params["videoId"]
    if(!videoId){
        throw new ApiError(400, "Video id is required")
    }
    const video = await Like.create({
        video: videoId,
        likedBy: req.user._id
    })

    return res
    .status(200)    
    .json(new ApiResponse(200, video, "Video liked successfully"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const tweetId = req.params["tweetId"]
    if(!tweetId){
        throw new ApiError(400, "Tweet id is required")
    }
    const tweet = await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet liked successfully"))

})

export {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike 
}

