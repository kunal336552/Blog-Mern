import { setBlog } from '@/Redux/blogSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from '../Components/BlogCard';

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector(store => store.blog)

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-published-blogs",
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }
    getAllPublishedBlogs()
  }, [])

  return (
    <div className='pt-20 pb-10 min-h-screen px-3 md:px-6'>

      {/* Heading */}
      <div className='max-w-6xl mx-auto text-center mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold'>Our Blogs</h1>
        <div className='w-20 h-1 bg-red-500 mx-auto mt-2 rounded-full'></div>
      </div>

      {/* Blogs Grid */}
      <div className='max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>

        {blog?.length === 0 ? (
          <p className='text-center col-span-full'>No blogs found</p>
        ) : (
          blog?.map((item) => (
            <BlogCard blog={item} key={item._id} />
          ))
        )}

      </div>

    </div>
  )
}

export default Blog