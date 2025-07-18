import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { marked } from "marked";
import TurndownService from "turndown";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useUser } from "../hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import type { UpdateDiscussionPost } from "@repo/zod";
import axios from "axios";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { BASE_URL, DISSCUSS_PATH } from "../constants";
import { Toast, ToastError, ToastSuccess } from "../utils/ToastContainers";

const DiscussUpdatePage = () => {
  const { data: userData } = useUser();
  const { postId } = useParams();
  const navigate = useNavigate();
  const turndownService = new TurndownService();
  const [content, setContent] = useState<string>("");

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDiscussionPost>();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${DISSCUSS_PATH}/post/${postId}`);
        const { title, description } = res.data.data;
        setValue("title", title);
        setContent(turndownService.turndown(description));
      } catch (error: any) {
        ToastError("Failed to fetch post data.");
      }
    };
    fetchPostData();
  }, []);

  const handleContentChange = (value?: string) => {
    const newValue = value || "";
    setContent(newValue);
    setValue("description", newValue);
  };

  const onSubmit = async (data: UpdateDiscussionPost) => {
    const title = data.title!;
    const description = data.description!;

    const contentHtml = marked(description);

    try {
      const res = await axios.patch(
        `${BASE_URL}${DISSCUSS_PATH}/update/post/${postId}`,
        { title, description: contentHtml },
        { withCredentials: true }
      );
      if (res.data.success) {
        ToastSuccess(res.data.message);
        reset();
        setContent("");
        setTimeout(() => navigate("/discuss"), 1000);
      }
    } catch (err: any) {
      ToastError(err?.response?.data?.error || "Update failed.");
    }
  };

  return (
    <>
      <Toast />
      <div className="min-h-screen py-10 px-4 flex justify-center bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6] text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-5xl bg-neutral-100 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData?.data.avatar!} />
              <AvatarFallback className="text-black font-semibold bg-white">
                {userData?.data.fullname?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Input
                placeholder="Edit title..."
                className="text-xl border-0 bg-transparent text-black focus:ring-0 focus-visible:ring-0 focus:border-0"
                {...register("title")}
              />
              {errors?.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                className="bg-neutral-200 hover:bg-neutral-200"
                onClick={() => navigate("/discuss")}
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Update</Button>
            </div>
          </div>

          <div data-color-mode="light">
            <MDEditor
              value={content}
              height={500}
              preview="live"
              onChange={handleContentChange}
              className="rounded-lg"
            />
            {errors?.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DiscussUpdatePage;
