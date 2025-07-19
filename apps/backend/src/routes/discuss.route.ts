import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware";
import { addPost, updatePost, deletePost, getAllPosts, getPostById, toggleUpvote, incViews } from "../controllers/discuss.controller";

const router: Router = Router();

router.post("/create/post",isLoggedIn,addPost)
router.patch("/update/post/:postId",isLoggedIn,updatePost)
router.delete("/delete/post/:postId",isLoggedIn, deletePost)
router.get("/all", getAllPosts)
router.get("/post/:postId", getPostById)
router.post("/upvote/post/:postId",isLoggedIn, toggleUpvote)
router.post("/add-views/post/:postId", incViews)

export default router 