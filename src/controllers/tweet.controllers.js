import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Tweet } from "../models/tweets.model.js";
import { response } from "express";

const createTweet = asyncHandler(async (req, res) => {
	const { content } = req.body;
	if (!content) {
		throw new ApiError(400, "Content is required");
	}
	const tweet = await Tweet.create({
		content,
		owner: req.user._id,
	});
	return res
		.status(200)
		.json(new ApiResponse(200, tweet, "Tweet created successfully"));
});

const allTweet = asyncHandler(async (req, res) => {
	const tweets = await Tweet.find();
	return res
		.status(200)
		.json(new ApiResponse(200, tweets, "All tweets retrieved successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
	const tweets = await Tweet.find({ owner: req.user._id });
	return res
		.status(200)
		.json(new ApiResponse(200, tweets, "Your tweets retrieved successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
	const id = req.params["tweetId"];
	if (!id) {
		throw new ApiError(400, "Tweet id is required");
	}
	const { content } = req.body;
	const tweet = await findByIdAndUpdate(id, {
		content,
	});
	return res
		.status(200)
		.json(new ApiResponse(200, tweet, "tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Tweet id is required");
	}

	const tweet = await Tweet.findByIdAndDelete({
		_id: id,
		owner: req.user._id,
	});

	return res
		.status(200)
		.json(new ApiResponse(200, tweet, "Tweet deleted successfully"));
});
export { createTweet, allTweet,updateTweet, deleteTweet, getUserTweets };
