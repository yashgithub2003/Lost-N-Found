import express from "express";
import { addNewPost, deletePost, getAllPost, getNearbySearchPostsByPostId, markAsCompleted } from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.get("/nearby/:postId", getNearbySearchPostsByPostId);
router.get("/delete/:id",isAuthenticated, deletePost);
router.put("/update/:id",isAuthenticated, markAsCompleted);
router.get("/getallpost", getAllPost);
export default router;