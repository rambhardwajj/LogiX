import { db, discussion, eq, users, and } from "@repo/drizzle";
import { ApiResponse, asyncHandler, CustomError } from "@repo/utils";
import {
  createDiscussionPostValidation,
  handleZodError,
  updateDiscussionPostValidation,
} from "@repo/zod";
import { RequestHandler } from "express";

export const addPost: RequestHandler = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    tags = [],
  } = handleZodError(createDiscussionPostValidation(req.body));
  const userId = req.user.id;
  const user = await db.select().from(users).where(eq(users.id, userId));
  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const [existingPost] = await db
    .select()
    .from(discussion)
    .where(and(eq(discussion.userId, userId), eq(discussion.title, title)))
    .limit(1);

  if (existingPost) {
    throw new CustomError(
      409,
      "You have already created a post with this title"
    );
  }

  const [createPost] = await db
    .insert(discussion)
    .values({
      userId,
      title,
      description,
      tags,
    })
    .returning();

  if (!createPost) throw new CustomError(500, "Failed to create post");

  return res
    .status(200)
    .json(
      new ApiResponse(201, "Discussion Post Created Successfully", createPost)
    );
});

export const updatePost: RequestHandler = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const { title, description, tags } = handleZodError(
    updateDiscussionPostValidation(req.body)
  );

  if (!title && !description && !tags) {
    throw new CustomError(404, "No valid data to update");
  }

  if (!postId) throw new CustomError(404, "PostId Not found");

  const [post] = await db
    .select()
    .from(discussion)
    .where(eq(discussion.id, postId));

  if (!post) throw new CustomError(404, "Post Not found");

  if (post.userId !== req.user.id) {
    throw new CustomError(403, "You are not authorized to update this post");
  }

  const updatePayload = {
    title: title ?? post.title,
    description: description ?? post.description,
    tags: tags ?? post.tags,
  };

  const [updatedPost] = await db
    .update(discussion)
    .set(updatePayload)
    .where(eq(discussion.id, postId))
    .returning();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Discussion Post Updated Successfully", updatedPost)
    );
});

export const deletePost: RequestHandler = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) throw new CustomError(404, "post Id not found");

  const [post] = await db
    .select()
    .from(discussion)
    .where(eq(discussion.id, postId));

  if (!post) throw new CustomError(404, "No post found to delete");

  const [deletedPost] = await db
    .delete(discussion)
    .where(eq(discussion.id, postId))
    .returning();

    return res.status(200).json(new ApiResponse(200, "Discussion Post Deleted Successfully", deletedPost));
});


