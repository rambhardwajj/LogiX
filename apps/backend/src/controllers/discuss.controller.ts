import {
  db,
  discussion,
  eq,
  users,
  and,
  comment,
  discussionUpvote,
} from "@repo/drizzle";
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

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Discussion Post Deleted Successfully", deletedPost)
    );
});

export const getPostById: RequestHandler = asyncHandler(async (req, res) => {
  const { postid } = req.params;
  if (!postid) throw new CustomError(404, "Post Id not found");

  const postResult = await db
    .select({
      id: discussion.id,
      title: discussion.title,
      description: discussion.description,
      commentsCount: discussion.commentsCount,
      upvotes: discussion.upvotes,
      views: discussion.views,
      createdAt: discussion.created_at,
      updatedAt: discussion.updated_at,
      userId: users.id,
      userEmail: users.email,
      userFullname: users.fullname,
      userAvatar: users.avatar,
    })
    .from(discussion)
    .where(eq(discussion.id, postid))
    .innerJoin(users, eq(discussion.userId, users.id))
    .limit(1);

  const postData = postResult[0];

  if (!postData) {
    throw new CustomError(404, "Post not found");
  }

  // 2. Fetch comments with their users
  const rawComments = await db
    .select({
      comment: comment.comment,
      upvote: comment.upvote,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
      userId: users.id,
      userEmail: users.email,
      userFullname: users.fullname,
      userAvatar: users.avatar,
      userCreatedAt: users.created_at,
    })
    .from(comment)
    .where(eq(comment.discussId, postid))
    .innerJoin(users, eq(comment.userId, users.id));

  const comments = rawComments.map((c) => ({
    comment: c.comment,
    upvote: c.upvote,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    user: {
      id: c.userId,
      email: c.userEmail,
      fullname: c.userFullname,
      avatar: c.userAvatar,
      createdAt: c.userCreatedAt,
    },
  }));

  // 3. Fetch upvote userIds
  const upvotes = await db
    .select({ userId: discussionUpvote.userId })
    .from(discussionUpvote)
    .where(eq(discussionUpvote.discussionId, postid));

  // 4. Final post structure
  const post = {
    id: postData.id,
    title: postData.title,
    description: postData.description,
    commentsCount: postData.commentsCount,
    upvotes: postData.upvotes,
    views: postData.views,
    createdAt: postData.createdAt,
    updatedAt: postData.updatedAt,
    user: {
      id: postData.userId,
      email: postData.userEmail,
      fullname: postData.userFullname,
      avatar: postData.userAvatar,
    },
    comments,
    DiscussionUpvote: upvotes,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, "Post Fetched Successfully", post));
});

export const getAllPosts: RequestHandler = asyncHandler(async (req, res) => {
  const posts = await db
    .select({
      id: discussion.id,
      title: discussion.title,
      description: discussion.description,
      views: discussion.views,
      tags: discussion.tags,
      commentsCount: discussion.commentsCount,
      upvotes: discussion.upvotes,
      createdAt: discussion.created_at,
      updatedAt: discussion.updated_at,
      userId: users.id, // flattening
      userEmail: users.email,
      userFullname: users.fullname,
      userAvatar: users.avatar,
      userCreatedAt: users.created_at,
    })
    .from(discussion)
    .innerJoin(users, eq(discussion.userId, users.id));

  const shapedPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    views: p.views,
    tags: p.tags,
    commentsCount: p.commentsCount,
    upvotes: p.upvotes,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    user: {
      id: p.userId,
      email: p.userEmail,
      fullname: p.userFullname,
      avatar: p.userAvatar,
      createdAt: p.userCreatedAt,
    },
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, "All posts fetched", shapedPosts));
});

