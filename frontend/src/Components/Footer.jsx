import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 md:flex  md:justify-between'>
        {/* info */}
        <div className='mb-6 md:mb-0'>
            <Link to="/" className='flex gap-3 items-center'>
            <img src={Logo} alt="" className='invert w-12 h-12'/>
            <h1 className='text-3xl font-bold'>Logo</h1>
            </Link>
            <p className='mt-2'>Sharing insights, tutorials and ideas on web devlopment and tech</p>
            <p className='mt-2 text-sm'>123 Blog st, Style city, NY 10001</p>
            <p className='text-sm'>Email: support@blog.com</p>
            <p className='text-sm'>Phone:(123) 456-7890</p>
        </div>
        {/* Customer service Link */}
        <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-semibold'>Quick Links</h3>
            <ul className='mt-2 text-sm space-y-2'>
                <li>Home</li>
                <li>Blogs</li>
                <li>About Us</li>
                <li>FAQs</li>
            </ul>
            </div>
              <div>
                {/* Social media links */}
                <div className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Follow Us</h3>
                    <div className='flex space-x-4 mt-2'>
                        <FaFacebook/>
                        <FaInstagram/>
                        <FaTwitterSquare/>
                        <FaPinterest/>
                    </div>
                </div>
                </div>
                {/* newsletter subscription */}
                <div>
                    <h3 className='text-xl font-semibold'>Stay in the loop</h3>
                    <p className='text-sm mt-2'>Subscribe to get the special offers, free giveaways and many more</p>
                    <form action="" className='mt-4 flex'>
                        <input type="email" placeholder='your email address' className='w-full bg-gray-700 p-2 rounded-1-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500'/>
                        <button type='submit' className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700'>Subscribe</button>
                    </form>
                </div>
                </div>
              
              {/* bottom section */}
              <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
                <p>&copy; {new Date().getFullYear()}<span className='text-red-500'>Blog</span>.All right reserved </p>
             </div>
        
    </footer>
  )
}

export default Footer
