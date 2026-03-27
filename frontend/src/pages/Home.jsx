import Footer from '@/Components/Footer'
import Hero from '@/Components/Hero'
import PopularAuthors from '@/Components/PopularAuthors'
import RecentBlog from '@/Components/RecentBlog'
import axios from 'axios'
import React, { useEffect } from 'react'


const Home = () => {
  return (
    <div className='pt-20'>
     <Hero/>
      <RecentBlog/>
      <PopularAuthors/>
    </div>
  )
}

export default Home
