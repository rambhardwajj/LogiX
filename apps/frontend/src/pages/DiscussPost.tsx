import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BASE_URL, DISSCUSS_PATH } from "../constants";
import { Toast, ToastError, ToastSuccess } from "../utils/ToastContainers";

export const DiscussPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [incremented, setIncremented] = useState(false);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}${DISSCUSS_PATH}/post/${postId}`
        );
        setPost(res.data.data);
      } catch (err) {
        ToastError("Failed to load post");
      }
    };
     const updateViews = async () => {
      setIncremented(()=> true)
      try {
        const res = await axios.post(
          `${BASE_URL}${DISSCUSS_PATH}/add-views/post/${postId}`,
          {},
          { withCredentials: true }
        );

        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!incremented) {
      updateViews();
    }

    fetchPost();
  }, [postId]);

  if (!post) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <Toast />
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6] p-8 flex justify-center">
        <div className="max-w-4xl w-full text-white bg-neutral-200 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-black">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-neutral-200 text-sm text-black font-medium px-3 py-1 rounded-xl shadow border"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="prose prose-invert max-w-none">
            {/* {turndownService.turndown(description)} */}
            <MarkdownPreview source={post.description} style={{ padding: 16 }} />
          </div>
        </div>
      </div>
    </>
  );
};
