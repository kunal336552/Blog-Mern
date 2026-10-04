import { Card } from "@/Components/ui/card";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBlog } from "@/Redux/blogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const YourBlog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const navigate = useNavigate();

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        "/api/v1/blog/get-own-blogs",
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

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `/api/v1/blog/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedBlogData = blog.filter(
          (blogItem) => blogItem?._id !== id
        );

        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 md:ml-[320px] pb-10">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <Card className="w-full p-5 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableCaption className="text-gray-600 dark:text-gray-400">
                A list of your recent blogs.
              </TableCaption>

              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-[300px]">
                    Title
                  </TableHead>

                  <TableHead className="min-w-[150px]">
                    Category
                  </TableHead>

                  <TableHead className="min-w-[120px]">
                    Date
                  </TableHead>

                  <TableHead className="text-center w-[100px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {blog?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img
                          src={item?.thumbnail}
                          className="w-20 h-14 object-cover rounded-md hidden md:block"
                          alt={item?.title || "Blog thumbnail"}
                        />

                        <h1
                          onClick={() =>
                            navigate(`/blogs/${item._id}`)
                          }
                          className="hover:underline cursor-pointer truncate max-w-[300px] md:max-w-[450px] text-gray-900 dark:text-gray-100"
                        >
                          {item?.title}
                        </h1>
                      </div>
                    </TableCell>

                    <TableCell className="text-gray-700 dark:text-gray-200">
                      {item?.category}
                    </TableCell>

                    <TableCell className="text-gray-700 dark:text-gray-200">
                      {formatDate(item?.createdAt)}
                    </TableCell>

                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                          >
                            <BsThreeDotsVertical />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/deshboard/write-blog/${item._id}`
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={() => deleteBlog(item._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;