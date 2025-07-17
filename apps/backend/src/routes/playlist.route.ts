import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylistDetails,
  updatePlaylist,
} from "../controllers/playlist.controller";

const router: Router = Router();

router.get("/:playlistId", getPlaylistDetails);
router.post("/create", isLoggedIn, createPlaylist);
router.put("/:playlistId", isLoggedIn, updatePlaylist);
router.delete("/:playlistId", isLoggedIn, deletePlaylist);

export default router;
