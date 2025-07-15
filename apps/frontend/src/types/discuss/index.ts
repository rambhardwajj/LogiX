export type Post = {
  id: string;
  title: string;
  description: string;
  views: number;
  tags: string[];
  commentsCount: number;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    fullname: string;
    avatar: string | null;
    createdAt: Date;
  };
};
