import {
  MessageSquare,
  Eye,
  ThumbsUp,
  SquarePen,
  ChartNoAxesCombined,
  Ellipsis,
  Compass,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toast, ToastError, ToastSuccess } from "../utils/ToastContainers";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@repo/ui/components/dropdown-menu";

import { ClipLoader } from "react-spinners";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import type { Post } from "@/types/discuss";

import axios from "axios";
import { useUser } from "../hooks";

import {dummyPosts} from "../constants"

const DiscussPage = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  let [originalPosts, setOriginalPosts] = useState<Post[]>(dummyPosts);
  const [activeFilter, setActiveFilter] = useState<null | "mv" | "lt">(null);
  const [loading, setLoading] = useState(false);

  const formatTime = (date: string) => {
    const postCreatedTime = new Date(date);
    const currentTime = new Date();
    const diffMs = currentTime.getTime() - postCreatedTime.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {}, []);

  const { data: userData } = useUser();

  const handleUpvote = async (postid: string) => {
  };

  const handleDelete = async (postId: string) => {
    try {
    } catch (error: any) {
      ToastError(error?.response?.data?.error || "Failed to delete post");
    }
  };

  const handleDialogClose = (value: boolean) => {
    setDeleteDialogOpen(value);
    setSelectedPostId(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPostId) {
      await handleDelete(selectedPostId);
    }
    handleDialogClose(false);
  };

  const handleFilter = (type: "mv" | "lt") => {
    if (activeFilter === type) {
      setActiveFilter(null);
      setPosts(originalPosts);
    } else {
      setActiveFilter(type);
      const sorted =
        type === "mv"
          ? [...originalPosts].sort((a, b) => b.upvotes - a.upvotes)
          : [...originalPosts].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
      setPosts(sorted);
    }
  };

  

  const tagMap = originalPosts.reduce<Record<string, Post[]>>((acc, post) => {
    const tag = post.tags?.[0] || "Other";
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(post);
    return acc;
  }, {});

  const hasUserUpvoted = (discuss: { userId: string }[]) => {
    return userData
      ? discuss.some((post) => post.userId?.includes(userData.data.id))
      : false;
  };



  return (
    <>
      <Toast />
      {loading && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader size={50} color="#4F46E5" />
        </div>
      )}
      <AlertDialog open={deleteDialogOpen} onOpenChange={handleDialogClose}>
        <AlertDialogContent className="bg-neutral-900 border-none text-neutral-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="text-neutral-900 border border-neutral-950"
              onClick={() => handleDialogClose(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-700 hover:bg-red-800"
              onClick={handleDeleteConfirm}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className=" bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]">
        <div className=" min-h-screen overflow-hidden max-w-7xl mx-auto  ">
          {/* Header  */}
          <div className=" flex justify-between bg-white rounded-lg p-3 m-3  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {/* Sorting  button  */}
            <div className="flex  gap-2  px-4">
              {/* Most voted button  */}
              <div
                className={`flex items-center gap-2 px-4  rounded-lg  border border-neutral-300 ${
                  activeFilter === "mv"
                    ? "border-blue-500"
                    : "border-neutral-300"
                }   hover:border-blue-500 hover:from-blue-900/20 hover:to-blue-800/20 cursor-pointer transition-all duration-300 group`}
                onClick={() => handleFilter("mv")}
              >
                <ThumbsUp
                  size={16}
                  className="text-neutral-900 group-hover:text-violet-700 transition-colors duration-300"
                />
                <span className="text-sm font-medium text-neutral-900 group-hover:text-violet-700 transition-colors duration-300">
                  Most Votes
                </span>
              </div>

              {/* Latest Button  */}
              <div
                className={`flex items-center gap-2 px-4  rounded-lg  border ${
                  activeFilter === "lt"
                    ? "border-blue-500"
                    : "border-neutral-300"
                }   hover:border-blue-500 hover:from-blue-900/20 hover:to-blue-800/20 cursor-pointer transition-all duration-300 group`}
                onClick={() => handleFilter("lt")}
              >
                <ChartNoAxesCombined
                  size={16}
                  className=" group-hover:text-violet-700 transition-colors duration-300"
                />
                <span className="text-sm font-medium text-neutral-900 group-hover:text-violet-700 transition-colors duration-300">
                  Latest
                </span>
              </div>
            </div>

            {/* Create Button  */}
            <div className="">
              <Button
                className=" flex items-center gap-2 px-4  hover:bg-violet-200 rounded-lg  border border-neutral-300 cursor-pointer mr-4"
                onClick={() => navigate("/discuss/create")}
              >
                <SquarePen size={18} className="mr-1" /> Create
              </Button>
            </div>
          </div>

          <div className="min-h-[75vh] flex flex-col md:flex-row gap-3">
            <div className=" px-4 flex-2  ">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white rounded-lg p-3 my-3 border-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                >
                  <CardContent className=" ">
                    <Link to={`/discuss/${post.id}`}>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={post.user.avatar!} />
                            <AvatarFallback className="text-sm">
                              {post.user.email.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                            <span className="font-medium ">
                              {post.user.fullname} (@{post.user.email})
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">
                              {formatTime(post.createdAt.toString())}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row gap-2">
                          {post.tags.map((tag, index) => {
                            return (
                              <div
                                key={index}
                                className="bg-violet-100 border-1 border-neutral-700 px-2.5 py-0.5 text-xs  h-7 rounded-full text-center"
                              >{`# ${tag}`}</div>
                            );
                          })}
                        </div>
                      </div>

                      <h2 className=" ml-13 text-sm font-semibold  mb-2 line-clamp-2 hover:underline transition-colors">
                        {post.title}
                      </h2>

                      <p className="ml-13 text-gray-400  text-xs line-clamp-2">
                        {post.description.replace(/<[^>]+>/g, "")}
                      </p>
                    </Link>

                    <div className="ml-13 flex justify-between">
                      <div className="flex items-center gap-4 mt-6 text-sm text-violet-400">
                        <div
                          className="flex items-center gap-1 cursor-pointer hover:text-pink-500"
                          onClick={() => handleUpvote(post.id)}
                        >
                          <ThumbsUp
                          size={12}
                          className={`${
                            post.upvotes > 0
                              ? "text-violet-600 fill-violet-600"
                              : "text-gray-400"
                          
                          }`}
                        />
                          <span className="text-[12px]" >{post.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={12} className="text-violet-400" />
                          <span className="text-[12px]" >{post.views}</span>
                        </div>
                        <Link to={`/discuss/${post.id}`}>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <MessageSquare
                              size={12}
                              className="text-violet-400"
                            />
                            <span className="text-[12px]" >{post.commentsCount}</span>
                          </div>
                        </Link>
                      </div>
                      {post.user.email === userData?.data.email ? (
                        <div className="mt-6 cursor-pointer">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Ellipsis className="mt-6" size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-16 text-left px-2  bg-zinc-800 text-zinc-100 border-none">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/discuss/edit/${post.id}`)
                                }
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className=" border border-neutral-700" />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => {
                                  setSelectedPostId(post.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

              {/* Explore  */}
            <div className="  hidden lg:block  w-[15vw] min-h-[70vh] overflow-y-auto bg-white rounded-lg p-3 m-3   shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
              <div className="  h-full w-[90%] transition-all duration-300 rounded-xl ">
                <div className="p-1 flex gap-2 text-violet-950 items-center mb-4">
                  <span className="text-md font-semibold ">
                    Explore
                  </span>
                  <Compass className="" size={20} />
                </div>

                {Object.entries(tagMap).map(([tag, posts], idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-zinc-900 font-medium mb-1">#{tag}</p>
                    {posts.map((post) => (
                      <Link to={`/discuss/${post.id}`}>
                        <p
                          key={post.id}
                          className="text-zinc-700 text-sm hover:underline cursor-pointer truncate"
                        >
                          {post.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussPage;
