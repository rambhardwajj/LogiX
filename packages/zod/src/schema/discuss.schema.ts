import { z } from "zod";

const createDiscussionPostSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  tags: z.array(z.string()).optional(),
});

const updateDiscussionPostSchema = createDiscussionPostSchema.partial();
const commentSchema = z.object({
  comment: z.string().nonempty("Comment is required"),
});

export type CreateDiscussionPost = z.infer<typeof createDiscussionPostSchema>;
export type UpdateDiscussionPost = z.infer<typeof updateDiscussionPostSchema>;
type AddComment = z.infer<typeof commentSchema>;

export const createDiscussionPostValidation = (data: CreateDiscussionPost) => {
  return createDiscussionPostSchema.safeParse(data);
};

export const updateDiscussionPostValidation = (data: UpdateDiscussionPost) => {
  return updateDiscussionPostSchema.safeParse(data);
};

export const addCommentsValidation = (data: AddComment) => {
  return commentSchema.safeParse(data);
};
