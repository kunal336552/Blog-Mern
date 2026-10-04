import { setBlog } from "@/Redux/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const RecentBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          "/api/v1/blog/get-published-blogs",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col space-y-4 items-center px-4">
        <h1 className="text-4xl font-bold pt-10">Recent Blogs</h1>

        <hr className="w-24 border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div className="w-full min-w-0 mt-10">
            <div className="grid grid-cols-1 gap-6">
              {blog?.slice(0, 4).map((blogItem) => (
                <div
                  key={blogItem?._id || blogItem?.id}
                  className="w-full min-h-[220px]"
                >
                  <BlogCardList blog={blogItem} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white hidden md:block dark:bg-gray-700 w-full p-5 rounded-md mt-10 h-fit">
            <h1 className="text-2xl font-semibold">
              Popular Categories
            </h1>

            <div className="my-5 flex flex-wrap gap-3">
              {[
                "Blogging",
                "Web Development",
                "Digital Marketing",
                "Cooking",
                "Photography",
                "Sports",
              ].map((item) => (
                <Badge
                  onClick={() =>
                    navigate(`/search?q=${encodeURIComponent(item)}`)
                  }
                  key={item}
                  className="cursor-pointer"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <h1 className="text-xl font-semibold">
              Subscribe to Newsletter
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Get latest posts and updates delivered straight to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 text-sm"
              />

              <Button className="h-10">
                Subscribe
              </Button>
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-semibold mb-3">
                Suggested Blogs
              </h2>

              <ul className="space-y-3">
                {[
                  "10 Tips to Master React",
                  "Understanding Tailwind CSS",
                  "Improve SEO in 2026",
                ].map((title) => (
                  <li
                    key={title}
                    className="text-sm dark:text-gray-100 hover:underline cursor-pointer"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;