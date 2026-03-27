import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./Components/Navbar"
import Deshboard from "./pages/Deshboard"
import Profile from "./pages/Profile"
import YourBlog from "./pages/YourBlog"
import Comments from "./pages/Comments"
import WriteBlog from "./pages/WriteBlog"
import UpdateBlog from "./pages/UpdateBlog"
import BlogView from "./pages/BlogView"
import Footer from "./Components/Footer"
import SearchList from "./pages/SearchList"


function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/><Footer/></>
    },
    {
      path:"/about",
      element:<><Navbar/><About/><Footer/></>
    },
    {
      path:"/search",
      element:<><Navbar/><SearchList/><Footer/></>
    },
    {
      path:"/blog",
      element:<><Navbar/><Blog/><Footer/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"/signup",
      element:<><Navbar/><Signup/></>
    },
    {
      path:"/blogs/:blogId",
      element:<><Navbar/><BlogView/></>
    },
    {
      path:"/deshboard",
      element:<><Navbar/><Deshboard/></>,
      children:[
        {
          path:"profile",
          element:<Profile/>,
        },
        {
          path:"your-blog",
          element:<YourBlog/>,
        },
        {
          path:"comments",
          element:<Comments/>,
        },
        {
          path:"write-blog",
          element:<WriteBlog/>,
        },
        {
          path:"write-blog/:blogId",
          element:<UpdateBlog/>,
        },
      ]
    },
  ])

  return (
    <>
     <RouterProvider router={router}/> 
    </>
  )
}

export default App
