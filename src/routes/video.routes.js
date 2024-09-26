import { Router } from "express";
import {
	deleteVideo,
	getAllVideos,
	getVideoById,
	publishAVideo,
	togglePublishStatus,
	updateThumbnail,
	updateVideoInformation,
} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
	.route("/")
	.get(getAllVideos)
	.post(
		upload.fields([
			{
				name: "videoFile",
				maxCount: 1,
			},
			{
				name: "thumbnail",
				maxCount: 1,
			},
		]),
		publishAVideo,
	);

router
	.route("/:videoId")
	.get(getVideoById)
	.delete(deleteVideo);
router
	.route("/update-video-information/:videoId")	
	.patch(updateVideoInformation);
router
	.route("/update-thumbnail/:videoId")	
	.patch(upload.single("thumbnail"), updateThumbnail);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
