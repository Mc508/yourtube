import mongoose, { Schema } from "mongoose";

const playlistsSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
		videos: [
			{
				type: Schema.Types.ObjectId,
				ref: "Video",
			},
		],
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestsamps: true },
);

export const Playlist = mongoose.model("Playlist", playlistsSchema);
