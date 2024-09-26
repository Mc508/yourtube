import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlists.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
	const { name, description, videos } = req.body;
	if (!name || !description || !videos) {
		throw new ApiError(400, "Name, description and videos are required");
	}

	const playlist = await Playlist.create({
		name,
		description,
		videos,
		owner: req.user._id,
	});

	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Playlist id is required");
	}
	const playlist = await Playlist.findById(id);
	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
	const videoId = req.params["videoId"];
	const playlistId = req.params["playlistId"];
	
	if (!playlistId || !videoId) {
		throw new ApiError(400, "Playlist id and video id are required");
	}

	const playlist = await Playlist.findByIdAndUpdate(
		playlistId,
		{
			$push: { videos: videoId },
		},
		{ new: true },
	);

	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
	const videoId = req.params["videoId"];
	const playlistId = req.params["playlistId"];

	if ((!playlistId, !videoId)) {
		throw new ApiError(400, "Playlist id and video id are required");
	}

	const playlist = await Playlist.findByIdAndUpdate(
		playlistId,
		{
			$pull: { videos: videoId },
		},
		{ new: true },
	);

	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Playlist id is required");
	}

	const playlist = await Playlist.findByIdAndDelete(id);
	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist deleted successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
	const id = req.params["userId"];
	const playlists = await Playlist.findById(id);
	return res
		.status(200)
		.json(new ApiResponse(200, playlists, "Playlists fetched successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
	const id = req.params["id"];
	if (!id) {
		throw new ApiError(400, "Playlist id is required");
	}
	const { name, description } = req.body;
	if (!name && !description) {
		throw new ApiError(400, "Name and description are required");
	}
	const playlist = await Playlist.findByIdAndUpdate(
		id,
		{
			name,
			description,
		},
		{ new: true },
	);
	return res
		.status(200)
		.json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
	removeVideoFromPlaylist,
	getPlaylistById,
	createPlaylist,
	getUserPlaylists,
	addVideoToPlaylist,
	deletePlaylist,
	updatePlaylist,
};
