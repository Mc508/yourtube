import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";

const publishAVideo = asyncHandler(async (req, res) => {
	const { title, description, isPublished } = req.body;
	if (!title && !description) {
		throw new ApiError(400, "Title and description are required");
	}

	const owner = req.user._id;

	const videoFileLocalPath = req.files?.videoFile[0]?.path;

	const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

	const videoFile = await uploadOnCloudinary(videoFileLocalPath);
	const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

	if (!videoFile || !thumbnail) {
		throw new ApiError(500, "Something went wrong");
	}
	const video = await Video.create({
		videoFile: videoFile.url,
		thumbnail: thumbnail.url,
		title,
		description,
		duration: videoFile.duration,
		isPublished,
		owner,
	});
	if (!video) {
		throw new ApiError(500, "Something went wrong to upload video");
	}
	return res
		.status(201)
		.json(new ApiResponse(200, video, "Video uploaded successfully"));
});

const updateVideoInformation = asyncHandler(async (req, res) => {
	const id = req.params["videoId"];
	console.log(id);
	const { title, description, isPublished } = req.body;
	if (!title || !description) {
		throw new ApiError(400, "Title and description are required");
	}

	if (!id) {
		throw new ApiError(400, "Video id is required");
	}
	const video = await Video.findByIdAndUpdate(
		id,
		{
			title,
			description,
			isPublished,
		},
		{ new: true },
	);

	return res
		.status(200)
		.json(
			new ApiResponse(200, video, "Video information updated successfully"),
		);
});

const updateThumbnail = asyncHandler(async (req, res) => {
	const id = req.params["videoId"];
	console.log(id);

	if (!id) {
		throw new ApiError(400, "Video id is required");
	}

	const thumbnailLocalPath = req.file?.path;
	const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
	const video = await Video.findByIdAndUpdate(
		id,
		{
			thumbnail: thumbnail.url,
		},
		{ new: true },
	);

	return res
		.status(200)
		.json(new ApiResponse(200, video, "Thumbnail updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Video id is required");
	}

	const video = await Video.findByIdAndDelete(id);
	return res
		.status(200)
		.json(new ApiResponse(200, video, "Video deleted successfully"));
});

const getAllVideos = asyncHandler(async (req, res) => {
	const videos = await Video.find();
	return res
		.status(200)
		.json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const getYourVideos = asyncHandler(async (req, res) => {
	const videos = await Video.find({ owner: req.user._id });
	return res
		.status(200)
		.json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Video id is required");
	}

	const video = await Video.findById(id);
	return res
		.status(200)
		.json(new ApiResponse(200, video, "Video fetched successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
	const id = req.params["videoId"];
	if (!id) {
		throw new ApiError(400, "Video id is required");
	}

	const video = await Video.findByIdAndUpdate(
		id,
		{
			isPublished: !video.isPublished,
		},
		{ new: true },
	);
	return res
		.status(200)
		.json(new ApiResponse(200, video, "Video status updated successfully"));
});

export {
	togglePublishStatus,
	getVideoById,
	publishAVideo,
	updateVideoInformation,
	updateThumbnail,
	deleteVideo,
	getAllVideos,
	getYourVideos,
};
