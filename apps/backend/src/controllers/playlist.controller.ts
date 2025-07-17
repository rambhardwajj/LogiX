import { and, db, eq, or, playlist, problemInPlaylist, problems, users,
} from "@repo/drizzle";
import { ApiResponse, asyncHandler, CustomError } from "@repo/utils";
import { createPlaylistValidation, handleZodError } from "@repo/zod";

import { RequestHandler } from "express";

export const getPlaylistDetails: RequestHandler = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId) throw new CustomError(404, "No playlist id found");

    const currPlaylist = await db
      .select()
      .from(playlist)
      .where(eq(playlist.id, playlistId));

    if (!currPlaylist.length) throw new CustomError(404, "Playlist not found");

    const problemList = await db
      .select({ problems })
      .from(problemInPlaylist)
      .leftJoin(problems, eq(problems.id, problemInPlaylist.problemId))
      .where(eq(problemInPlaylist.playListId, playlistId));

    res.status(200).json(
      new ApiResponse(200, "Playlist fetched Successfully", {
        ...problemList[0],
        problems: problemList.map((r) => r.problems),
      })
    );
  }
);

export const createPlaylist: RequestHandler = asyncHandler(async (req, res) => {
  const { name, description, visibilty, type } = handleZodError(
    createPlaylistValidation(req.body)
  );
  const userId = req.user.id;
  const [currPlaylist] = await db
    .insert(playlist)
    .values({ name, description, userId, visibilty, type })
    .returning();
  res
    .status(201)
    .json(new ApiResponse(201, "Playlist created Successfully", currPlaylist));
});

export const updatePlaylist: RequestHandler = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) throw new Error("Playlist ID is required");

  const { name, description, visibilty, type } = handleZodError(
    createPlaylistValidation(req.body)
  );
  const userId = req.user.id;
  const [playList] = await db
    .update(playlist)
    .set({ name, description, userId, visibilty, type })
    .where(eq(playlist.id, playlistId))
    .returning();

  if (!playList) throw new CustomError(404, "Playlist not found");

  res
    .status(200)
    .json(new ApiResponse(200, "Playlist updated Successfully", playList));
});

export const deletePlaylist: RequestHandler = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if(!playlistId) throw new CustomError(404, "Playlist ID is required");

  const [del] = await db
    .delete(playlist)
    .where(eq(playlist.id, playlistId))
    .returning();

  if (!del) throw new CustomError(404, "Playlist not found");
  res
    .status(200)
    .json(new ApiResponse(200, "Playlist deleted Successfully", del));
});

