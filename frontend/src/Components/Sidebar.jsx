import { ChartColumnBig, SquareUser } from 'lucide-react'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { LiaCommentsSolid } from 'react-icons/lia'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='hidden fixed top-15 md:block border-r-2 dark:bg-gray-800 bg-white bg-gray-300 dark:border-gray-600 w-[300px] space-y-2 p-10 h-screen z-10'>
    <div className='pt-10 px-3 text-center space-y-2'>
        <NavLink to="/deshboard/profile" className={({isActive}) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
        <SquareUser/>
        <span>Profile</span>
        </NavLink>
        <NavLink to="/deshboard/your-blog" className={({isActive}) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
        <ChartColumnBig/>
        <span>Your Blogs</span>
        </NavLink>
        <NavLink to="/deshboard/comments" className={({isActive}) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
        <LiaCommentsSolid/>
        <span>Comments</span>
        </NavLink>
        <NavLink to="/deshboard/write-blog" className={({isActive}) => `text-2xl ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
        <FaRegEdit/>
        <span>Create Blog</span>
        </NavLink>
    </div>
    </div>
  )
}

export default Sidebar