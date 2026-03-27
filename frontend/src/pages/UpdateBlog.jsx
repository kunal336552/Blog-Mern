import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setBlog } from "@/Redux/blogSlice";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);

  const params = useParams();
  const id = params.blogId;
  const dispatch = useDispatch();
  const {blog,loading} = useSelector(store=>store.blog)
  const selectBlog = blog.find(blog=>blog._id  == id)
  const [content,setContent] = useState(selectBlog?.description)
  const [publish,setPublish] = useState(false)

  const [blogData,setBlogData] = useState({
    title:selectBlog?.title,
    subtitle:selectBlog?.subtitle,
    description:content,
    category:selectBlog?.category,
  })

  const [previewThumbnail,setPreviewThumbnail] = useState(selectBlog?.thumbnail)

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setBlogData((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

  const selectCategory = (value) =>{
    setBlogData({...blogData,category:value})
  }

  const selectThumbnail = (e) =>{
    const file = e.target.files?.[0];
    if(file){
      setBlogData({...blogData,thumbnail:file})
      const fileReader = new FileReader()
      fileReader.onloadend=()=>setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }
  }

  const updateBlogHandler = async() =>{
    const formData = new FormData()
    formData.append("title",blogData.title);
    formData.append("subtitle",blogData.subtitle);
    formData.append("description",content);
    formData.append("category",blogData.category);
    formData.append("file",blogData.thumbnail);
    try {
      dispatch(setLoading(true))
      const res = await axios.put(`http://localhost:8000/api/v1/blog/${id}`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
          },
        withCredentials:true,
      })
      if(res.data.success){
        toast.success(res.data.message)
        console.log(blogData)
      }
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  }

   const togglePublishOrUnpublish =async () => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/v1/blog/${id}`,{
        // params:{
        //   action
        // },
        withCredentials:true,
      })
      if(res.data.success){
        setPublish(!publish)
        toast.success(res.data.message)
        navigate("/deshboard/your-blog")
      }else{
        toast.error("Failed to update")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const deleteBlog = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`,{withCredentials:true})
      if(res.data.success){
        const updatedDataBlog = blog.filter((blogItem)=>blogItem?._id!==id)
        dispatch(setBlog(updatedDataBlog))
        toast.success(res.data.message)
        navigate("/deshboard/your-blog")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="md:ml-[320px] pt-20 pb-10 px-3">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="bg-white w-full dark:bg-gray-800 p-5 -space-y-3">
          <h1 className="text-4xl font-bold">Basic Blog Information</h1>
          <p>
            Make changes to your blogs here. Click publish when you are done
          </p>
          <div className="space-x-2">
            <Button onClick={()=>togglePublishOrUnpublish(selectBlog.isPublished ? "false" : "true")}>
              {
                selectBlog?.isPublished ? "Unpublish" : "Publish"
              }
            </Button>
            <Button onClick={deleteBlog} variant="destructive">Remove blog</Button>
          </div>
          <div className="pt-10">
            <Label className="mb-1">Title</Label>
            <Input
              type="text"
              placeholder="Enter a title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label className="mb-1">Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter a Subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className="dark:border-gray-300"
            />
          </div>
          <div>
            <Label className="mb-1">Description</Label>
            <JoditEditor ref={editor} className="jodit_toolbar" 
            value={blogData.description}
            onChange={newContent=>setContent(newContent)}
            />
          </div>
          <div>
            <Label className="mb-1">Category</Label>
            <Select onValueChange={selectCategory} className="dark:border-gray-300">
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web developing">Web developing</SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1">Thumbnail</Label>
            <Input
              type="file"
            onChange={selectThumbnail}
            id="file"
              accept="image/*"
            className="w-fit dark:bg-gray-300"
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail} alt="Blog Thumbnail"  className="w-64 my-2"/>
              )
            }
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={()=>navigate(-1)}>Back</Button>
            <Button onClick={updateBlogHandler}>
              {
                loading ? <><Loader2 className="me-2 w-4 h-4 animate-spin"/>Please wait</> : "Save"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
