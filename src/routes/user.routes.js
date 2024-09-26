import { Router } from "express";
import {
	changeCurrentPassword,
	getCurrentUser,
	getUserChannelProfile,
	getWatchHistory,
	loginUser,
	logoutUser,
	refreshAccessToken,
	registerUser,
	updateAccountDetails,
	updateAvatar,
	updateCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {
// 	deleteVideo,
// 	getAllVideos,
// 	getYourVideos,
// 	updateThumbnail,
// 	updateVideo,
// 	updateVideoInformation,
// 	uploadVideo,
// } from "../controllers/video.controller.js";
// import { uploadComment } from "../controllers/comments.controller.js";
// import { allTweet, createTweet, deleteTweet, yourTweets } from "../controllers/tweet.controller.js";
// import { allPlayList, createPlaylist } from "../controllers/playlist.controller.js";

const router = Router();

router.route("/register").post(
	upload.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
		{
			name: "coverImage",
			maxCount: 1,
		},
	]),
	registerUser,
);

router.route("/login").post(loginUser);

//secured routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
	.route("/update-avatar")
	.patch(verifyJWT, upload.single("avatar"), updateAvatar);
router
	.route("/update-coverImage")
	.patch(verifyJWT, upload.single("coverImage"), updateCoverImage);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getWatchHistory);


// // video routes

// router.route("/upload-video").post(
// 	verifyJWT,
// 	upload.fields([
// 		{
// 			name: "videoFile",
// 			maxCount: 1,
// 		},
// 		{
// 			name: "thumbnail",
// 			maxCount: 1,
// 		},
// 	]),
// 	uploadVideo,
// );
// router
// 	.route("/update-video-information/:id")
// 	.patch(verifyJWT, updateVideoInformation);
// router
// 	.route("/update-video/:id")
// 	.patch(verifyJWT, upload.single("videoFile"), updateVideo);
// router
// 	.route("/update-thumbnail/:id")
// 	.patch(verifyJWT, upload.single("thumbnail"), updateThumbnail);
// router.route("/delete-video/:id").delete(verifyJWT, deleteVideo);
// router.route("/all-videos").get(getAllVideos);
// router.route("/your-videos").get(verifyJWT,getYourVideos);

// // comment route
// router.route("/comment/:videoId").post(verifyJWT, uploadComment);

// // tweet route
// router.route("/tweet").post(verifyJWT, createTweet);
// router.route("/tweets").get(allTweet);
// router.route("/your-tweets").get(verifyJWT, yourTweets);
// router.route("/tweet/:id").delete(verifyJWT, deleteTweet);


export default router;

