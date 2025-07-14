import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware";
import { addPost, updatePost, deletePost } from "../controllers/discuss.controller";


const router: Router = Router();

router.post("/create/post",isLoggedIn,addPost);
router.post("/update/post/:postid",isLoggedIn,updatePost);
router.delete("/delete/post/:postid",isLoggedIn, deletePost);

export default router