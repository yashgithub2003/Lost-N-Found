import express from "express";
import { addNewPost, getNearbySearchPostsByPostId } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.get("/nearby/:postId", getNearbySearchPostsByPostId);
export default router;