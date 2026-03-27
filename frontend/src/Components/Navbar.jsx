import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChartColumnBig, LogOut, Search, User } from "lucide-react";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/Redux/themeSlice";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";
import axios from "axios";
import { LiaCommentSolid } from "react-icons/lia";
import userImg from '../assets/user.jpg'
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {theme} = useSelector(store=>store.Theme)
  const [searchTerm,setSearchTerm] = useState("")
  const [openNav,setOpenNav] = useState(false)

  const toggleNav = ()=>{
    setOpenNav(!openNav)
  }

  const handleSearch = (e)=>{
    e.preventDefault();
    if(searchTerm.trim() !== ""){
      navigate(`/search?q=${encodeURIComponent(searchTerm.toLowerCase())}`)
      setSearchTerm("")
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`,{withCredentials:true})
      if(res.data.success){
        navigate("/");
        dispatch(setUser(null))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-300 border-2 bg-white z-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <div className="flex gap-2 items-center">
              <img
                src={Logo}
                alt=""
                className="w-7 h-7 md:w-10 md:h-10 dark:invert"
              />
              <h1 className="font-bold text-3xl md:text-4xl">Logo</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-75 hidden md:block"
            />
            <Button onClick={handleSearch} className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>
        {/* nav section  */}
        <div className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/blog"}>
              <li>Blogs</li>
            </Link>
            <Link to={"/about"}>
              <li>About</li>
            </Link>
          </ul>
          <div className="flex">
            <Button onClick={()=>dispatch(toggleTheme())}>
              {
                theme === "light" ? <FaMoon/> : <FaSun/>
              }
            </Button>
            { user ? (
              <div className="ml-7 flex gap-3 items-center">
               

<DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Avatar>
                <AvatarImage src={user.photoUrl || userImg} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-2">
        <DropdownMenuGroup> 
          <DropdownMenuLabel className="text-[14px] text-black font-bold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>navigate("/deshboard/profile")} className="flex items-center gap-2">
            <User/>
            <span>Profiles</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate("/deshboard/your-blog")} className="flex items-center gap-2">
            <ChartColumnBig/>
            Your Blogs
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate("/deshboard/comments")} className="flex items-center gap-2">
            <LiaCommentSolid/>
            Comments
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate("/deshboard/write-blog")} className="flex items-center gap-2">
            <FaRegEdit/>
              <span>
                Writing Blogs
              </span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <LogOut/>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                
                <Button className="hidden md:block" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="ml-7 md:flex gap-2">
                <Link to={"/login"}>
                  <Button>Login</Button>
                </Link>
                <Link className="hidden md:block" to={"/signup"}>
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={toggleNav} className="w-7 h-7 md:hidden"/> :<HiMenuAlt1 onClick={toggleNav} className="w-7 h-7 md:hidden"/>
          }
        </div>
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} handleLogout={handleLogout}/>
      </div>
    </div>
  );
};

export default Navbar;
