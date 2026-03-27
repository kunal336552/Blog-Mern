import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Card } from "@/Components/ui/card";
import React, { useState } from "react";
import UserLogo from "../assets/user.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/Redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TotalProperty from "@/Components/TotalProperty";

const Profile = () => {
  const [open,setOpen] = useState(false)
  const { user,loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio,
    occupation: user?.occupation,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    instagram: user?.instagram,
    github: user?.github,
    file: user?.photoUrl,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
 };
    const changeFileHandler = (e) => {
      setInput({...input, file: e.target.files?.[0] });
    };
 

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName",input.firstName);
    formData.append("lastName",input.lastName);
    formData.append("bio",input.bio);
    formData.append("occupation",input.occupation);
    formData.append("facebook",input.facebook);
    formData.append("instagram",input.instagram);
    formData.append("linkedin",input.linkedin);
    formData.append("github",input.github);
    if(input?.file){
      formData.append("file",input?.file)
    }
    console.log(input);
    try {
      dispatch(setLoading(true))
      const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`,formData,{
        Headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      })
      if(res.data.success){
        setOpen(false)
        toast(res.data.message)
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(setLoading(false))
    }
  };
  console.log(user);
  return (
    <div className="pt-20 mb-10  md:ml-[320px] md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col justify-center items-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={user.photoUrl || "UserLogo"} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user.occupation || "Mern Stack Developer"}
            </h1>
            <div className="flex gap-4 items-center">
              <Link>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
            </div>
          </div>
          {/* info section */}
          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">Welcome {user?.firstName || "User"} !
            </h1>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "Kunal336552@gmail.com"}
            </p>
            <div className="flex flex-col items-start gap-2 my-5 justify-start">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600p-6 rounded-lg">
                {user.bio || "data is not fetch"}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button onClick={()=>setOpen(true)}>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Edit profile
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">First Name</Label>
                      <Input
                        id="name"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className="col-span-3 text-gray-500"
                        value={input.firstName}
                        onChange={changeEventHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        id="lastname"
                        type="text"
                        className="col-span-3 text-gray-500"
                        name="lastName"
                        placeholder="Last Name"
                        value={input.lastName}
                        onChange={changeEventHandler}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        type="text"
                        placeholder="Enter a Url"
                        className="col-span-3 text-gray-500"
                        value={input.facebook}
                        onChange={changeEventHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        type="text"
                        className="col-span-3 text-gray-500"
                        name="instagram"
                        placeholder="Enter a Url"
                        value={input.instagram}
                        onChange={changeEventHandler}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        type="text"
                        placeholder="Enter a Url"
                        className="col-span-3 text-gray-500"
                        value={input.linkedin}
                        onChange={changeEventHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        type="text"
                        className="col-span-3 text-gray-500"
                        name="github"
                        placeholder="Enter a Url"
                        value={input.github}
                        onChange={changeEventHandler}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 text-right">Description</Label>
                    <Textarea
                      className="col-span-3 text-gray-500"
                      id="bio"
                      name="bio"
                      placeholder="Enter a description"
                      value={input.bio}
                        onChange={changeEventHandler}
                    />
                  </div>

                  <div>
                    <Label className="mb-1 text-right">Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="w-[277px]"
                      onChange={changeFileHandler}
                    />
                  </div>

                  <DialogFooter>
                    <Button onClick={submitHandler} type="submit">
                      {
                  loading ? (
                    <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                    Please wait
                    </>
                  ) : ("Save changes")
                }
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </Card>
      </div>
      <TotalProperty/>
    </div>
  );
};

export default Profile;
