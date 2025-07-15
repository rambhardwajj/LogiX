import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
import MDEditor from "@uiw/react-md-editor";
import { PlusCircle, X } from "lucide-react";

import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Toast, ToastError, ToastSuccess } from "../utils/ToastContainers";
import { useUser } from "../hooks";
// import {type CreateDiscussionPost} from "@repo/zod"
import axios from "axios";
import { BASE_URL } from "../constants";

const DiscussCreate = () => {
  const { data: userData, isError } = useUser();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  const topics = watch("tags") || [];

  const handleContentChange = (value?: string) => {
    console.log(content);
    setContent(value || "");
    setValue("description", value || "");
  };

  const handleSaveTopic = () => {
    const trimmed = newTopic.trim();
    if (trimmed && !topics.includes(trimmed)) {
      const updated = [...topics, trimmed];
      setValue("tags", updated);
    }
    setNewTopic("");
    setIsModalOpen(false);
  };

  const removeTopic = (topicToRemove: string) => {
    const updated = topics.filter((topic: any) => topic !== topicToRemove);
    setValue("tags", updated);
  };

  const onSubmit = async (data: any) => {
    const { title, description, tags } = data;
    if (!title || !content) {
      ToastError("Missing Field Required");
      return;
    }

    const contentHtml = marked(description);
    const payload = {
      title,
      contentHtml,
      tags,
    };

    console.log(payload);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/discuss/create`,
        {
          title: payload.title,
          description: payload.contentHtml,
          tags: payload.tags,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        ToastSuccess(res.data.message);
        reset();
        handleContentChange("");
        setTimeout(() => navigate("/discuss"), 2000);
      }
    } catch (error: any) {
      ToastError(error?.response?.data?.error || "Failed to post");
    }
  };

  return (
    <>
      <Toast />
      <div className="min-h-[calc(100vh-50px)] flex flex-col items-center p-10 bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6] ">
        <form
          className="w-full max-w-7xl bg-white rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-4 py-4 flex items-center gap-3">
            <div className="flex justify-between flex-wrap items-center gap-4 w-full">
              {/* Left Section */}
              <div className="flex items-center gap-4 flex-wrap max-w-full">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={userData?.data.avatar!} />
                  <AvatarFallback className="text-black font-semibold text-lg bg-white">
                    {userData?.data.fullname?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <Input
                  placeholder="Title"
                  className="text-xl w-[30vw] min-w-[200px] h-10 px-4 py-2 bg-white border border-neutral-600 text-black rounded-md focus:outline-none"
                  {...register("title")}
                />

                <div
                  className="cursor-pointer flex items-center gap-2 px-4 h-10 bg-white hover:bg-violet-200 text-black rounded-md transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="text-sm font-medium">Add Topic</span>
                  <PlusCircle size={18} />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex gap-2 shrink-0">
                <Button
                  type="button"
                  className="text-sm px-4 py-2 bg-red-300 hover:bg-red-400  cursor-pointer text-black rounded-md"
                  onClick={() => navigate("/discuss")}
                >
                  Cancel
                </Button>
                <Button className="text-sm px-4 py-2 bg-violet-300 hover:bg-violet-400  cursor-pointer text-black rounded-md">
                  Post
                </Button>
              </div>
            </div>

            {errors?.title && <p className="text-red-500">{isError}</p>}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-[300px] max-w-xl bg-neutral-900 text-white px-4 py-4 rounded-xl shadow-lg border border-neutral-700">
                  {/* Close Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-white hover:text-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Input Field */}
                  <Input
                    className="w-full px-4 py-2 mt-3 text-white placeholder:text-neutral-300 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    placeholder="Type topic and press Enter"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSaveTopic();
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className=" rounded-md my-4">
            {topics.map((topic: string, index: number) => (
              <span
                key={index}
                className=" ml-10 max  gap-2 p-1  bg-neutral-200 rounded-xl shadow-sm border border-neutral-300"
              >
                <span className="text-sm font-medium text-black">{topic}</span>
                {/* Optional remove button/icon */}
                <button
                  onClick={() => removeTopic(topic)}
                  className="text-red-500 hover:text-red-700 text-xs px-2 font-semibold"
                >
                  X
                </button>
              </span>
            ))}
          </div>

          <div data-color-mode="light">
            <MDEditor
              height={600}
              preview="live"
              className="rounded-lg shadow-lg my-3 mx-10"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default DiscussCreate;
