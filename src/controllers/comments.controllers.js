import { Comment } from "../models/comments.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
	const { content } = req.body;

	if (!content) {
		throw new ApiError(400, "Content is required");
	}

	const videoId = req.params["videoId"];

	if (!videoId) {
		throw new ApiError(400, "Video id is required");
	}

	const comment = await Comment.create({
		content,
		video: videoId,
		owner: req.user._id,
	});
	return res
		.status(200)
		.json(new ApiResponse(200, comment, "Comment created successfully"));
});

const getVideoComments = asyncHandler(async (req, res) => {
	const videoId = req.params["videoId"];
	if (!videoId) {
		throw new ApiError("video id is required");
	}

	const comments = await Comment.find({ video: videoId });

	return res
		.status(200)
		.json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
	const commentId = req.params["commentId"];
	if (!commentId) {
		throw new ApiError("comment id is required");
	}
	const comment = await Comment.findByIdAndDelete(commentId);
	return res
		.status(200)
		.json(new ApiResponse(200, comment, "Comment deleted successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
	const commmentId = req.params["commentId"];

	if (!commmentId) {
		throw new ApiError("comment id is required");
	}

	const content = req.body;

	const comment = await Comment.findByIdAndUpdate(
		commmentId,
		{ content: content },
		{ new: true },
	);
	return res
		.status(200)
		.json(new ApiResponse(200, comment, "Comment updated successfully"));
});

export { addComment, getVideoComments, deleteComment ,updateComment};
